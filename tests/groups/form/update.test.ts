import { domUpdate } from "@/utils/delay";
import { getStack, setupTestFrame } from "@/utils/setupDom";
import { AlpineComponent } from "alpinejs";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * @vitest-environment jsdom
 */
type Component = {
  form: {
    name: string;
    agree: boolean;
    age: number;
    birthday: Date | string;
    file: FileList | string;
    tel: string;
    color: string;
    country: string;
    bio: string;
    gender: string;
  };
};

describe("Form update function", () => {
  beforeEach(() => {
    const data: AlpineComponent<Component> = {
      form: {
        name: "",
        agree: false,
        age: 0,
        birthday: "",
        file: "",
        color: "",
        tel: "",
        country: "",
        bio: "",
        gender: "",
      },
    };

    setupTestFrame(
      /* html */ `
        <input type="text" id="name" :value="form.name" @input="$_.form.update" @click="$_.form.update"  data-cspine="update:form.name" />
        <input type="checkbox" id="agree" checked @change="$_.form.update" data-cspine="update:form.agree" />
        <input type="number" id="age" :value="form.age" @input="$_.form.update" data-cspine="update:form.age" />
        <input type="date" id="birthday" @change="$_.form.update" data-cspine="update:form.birthday" />
        <input type="file" id="file" @change="$_.form.update" data-cspine="update:form.file" />
        <input type="color" id="color" @change="$_.form.update" data-cspine="update:form.color">
        <input type="tel" id="tel" @input="$_.form.update" data-cspine="update:form.tel" />
        <select id="country" @change="$_.form.update" data-cspine="update:form.country">
          <option value="ng">Nigeria</option>
          <option value="gh">Ghana</option>
        </select>

        <textarea id="bio" @input="$_.form.update" data-cspine="update:form.bio"></textarea>
        <input type="radio" name="gender" id="male" value="male" @change="$_.form.update" data-cspine="update:form.gender" />
        <input type="radio" name="gender" id="female" value="female" @change="$_.form.update" data-cspine="update:form.gender" />
      `,
      data
    );
  });

  it("updates a text input", async () => {
    const input = document.getElementById("name") as HTMLInputElement;
    input.value = "Alice";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    await domUpdate();
    const stack = getStack();

    expect(stack.data.form.name).toBe("Alice");
  });

  it("updates a checkbox input", async () => {
    const checkbox = document.getElementById("agree") as HTMLInputElement;
    checkbox.checked = true;
    checkbox.value = "on";
    checkbox.dispatchEvent(new Event("change", { bubbles: true }));

    await domUpdate();
    const stack = getStack();
    stack.load();

    expect(stack.set.form.agree).toBe(true);
  });

  it("updates a number input", async () => {
    const input = document.getElementById("age") as HTMLInputElement;
    input.value = "25";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    await domUpdate();
    const stack = getStack();
    stack.load();

    expect(stack.set.form.age).toBe(25);
  });

  it("updates a date input", async () => {
    const input = document.getElementById("birthday") as HTMLInputElement;
    input.value = "2020-01-01";
    input.dispatchEvent(new Event("change", { bubbles: true }));

    await domUpdate();
    const stack = getStack();
    stack.load();

    expect(stack.set.form.birthday instanceof Date).toBe(true);
    expect(stack.set.form.birthday.toISOString()).toContain("2020-01-01");
  });

  it("should update a color input", async () => {
    const input = document.getElementById("color") as HTMLInputElement;
    input.value = "#ff0000";
    input.dispatchEvent(new Event("change", { bubbles: true }));

    await domUpdate();
    const stack = getStack();
    stack.load();
    expect(stack.set.form.color).toBe("#ff0000");
  });

  it("should update a file input", async () => {
    const input = document.getElementById("file") as HTMLInputElement;

    // Mock FileList
    const file = new File(["hello"], "hello.txt", { type: "text/plain" });
    const mockFileList = {
      0: file,
      length: 1,
      item: (i: number) => file,
    };
    Object.defineProperty(input, "files", {
      value: mockFileList,
      writable: false,
    });

    input.dispatchEvent(new Event("change", { bubbles: true }));

    await domUpdate();
    const stack = getStack();

    expect(stack.set.form.file?.[0]?.name).toBe("hello.txt");
  });

  it("ignores unsupported event types", async () => {
    const input = document.getElementById("name") as HTMLInputElement;
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    input.value = "ignored";
    input.dispatchEvent(new Event("click", { bubbles: true }));

    await domUpdate();
    const stack = getStack();

    expect(stack.data.form.name).not.toBe("ignored");
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("warns on missing value", async () => {
    const input = document.getElementById("name") as HTMLInputElement;
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    input.removeAttribute("value");
    input.value = "";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    await domUpdate();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("defaults to value if type not explicitly handled", async () => {
    const input = document.getElementById("tel")! as HTMLInputElement;
    input.value = "123456";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    await domUpdate();

    const stack = getStack();

    expect(stack.data.form.tel).toBe("123456");
  });

  it("updates a select input", async () => {
    const select = document.getElementById("country") as HTMLSelectElement;
    select.value = "gh";
    select.dispatchEvent(new Event("change", { bubbles: true }));

    await domUpdate();
    const stack = getStack();
    stack.load();

    expect(stack.set.form.country).toBe("gh");
  });

  it("updates a textarea input", async () => {
    const textarea = document.getElementById("bio") as HTMLTextAreaElement;
    textarea.value = "Hello world!";
    textarea.dispatchEvent(new Event("input", { bubbles: true }));

    await domUpdate();
    const stack = getStack();
    stack.load();

    expect(stack.set.form.bio).toBe("Hello world!");
  });

  it("updates a radio input", async () => {
    const maleRadio = document.getElementById("male") as HTMLInputElement;
    maleRadio.checked = true;
    maleRadio.dispatchEvent(new Event("change", { bubbles: true }));

    await domUpdate();
    const stack = getStack();
    stack.load();

    expect(stack.set.form.gender).toBe("male");

    const femaleRadio = document.getElementById("female") as HTMLInputElement;
    femaleRadio.checked = true;
    femaleRadio.dispatchEvent(new Event("change", { bubbles: true }));

    await domUpdate();
    stack.load();

    expect(stack.set.form.gender).toBe("female");
  });
});
