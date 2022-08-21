// ==========================================
//  Title:  NotesComponent.spec.ts
//  Date:   19 August 2022
// ==========================================

//  External Dependency
import { shallowMount } from "@vue/test-utils";

//  Internal Dependency
import NotesComponent from "@/components/NotesComponent/NotesComponent.vue";

describe("NotesComponent.vue", () => {
  it("renders props.title when passed with props.status equals 'showing'", () => {
    const title = "new message";
    const wrapper = shallowMount(NotesComponent, {
      props: { title, status: "showing" },
    });
    expect(wrapper.html()).toContain(`<div class="title">${title}</div>`);
  });
  it("renders props.content when passed with props.status equals 'showing'", () => {
    const content = "new message";
    const wrapper = shallowMount(NotesComponent, {
      props: { content, status: "showing" },
    });
    expect(wrapper.html()).toContain(`<div class="content">${content}</div>`);
  });
  it("renders two buttons('Update', 'Delete') when passed with props.status equals 'showing'", () => {
    const wrapper = shallowMount(NotesComponent, {
      props: { title: "a", content: "a", status: "showing" },
    });
    expect(wrapper.find(".update").exists()).toBe(true);
    expect(wrapper.find(".delete").exists()).toBe(true);
  });
  it("emit events with Update and Delete when clicked", () => {
    const wrapper = shallowMount(NotesComponent, {
      props: {
        title: "a",
        content: "a",
        itemKey: "item_key",
        status: "showing",
      },
    });

    wrapper.find(".update").trigger("click");
    wrapper.find(".delete").trigger("click");

    expect(wrapper.emitted().update).toBeTruthy();
    expect(wrapper.emitted().update.length).toBe(1);
    expect(wrapper.emitted().update[0]).toEqual(["item_key"]);

    expect(wrapper.emitted().delete).toBeTruthy();
    expect(wrapper.emitted().delete.length).toBe(1);
    expect(wrapper.emitted().delete[0]).toEqual(["item_key"]);
  });

  it("renders props.title in input box when passed with props.status equals 'editing'", () => {
    const title = "new message";
    const wrapper = shallowMount(NotesComponent, {
      props: { title, status: "editing" },
    });
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find("input").element.value).toEqual(title);
  });
  it("renders props.content in input box when passed with props.status equals 'editing'", () => {
    const content = "new message";
    const wrapper = shallowMount(NotesComponent, {
      props: { content, status: "editing" },
    });
    expect(wrapper.find("textarea").exists()).toBe(true);
    expect(wrapper.find("textarea").element.value).toEqual(content);
  });
  it("renders two buttons('Confirm', 'Discard') when passed with props.status equals 'editing'", () => {
    const wrapper = shallowMount(NotesComponent, {
      props: { title: "a", content: "a", status: "editing" },
    });
    expect(wrapper.find(".discard").exists()).toBe(true);
    expect(wrapper.find(".confirm").exists()).toBe(true);
    expect(wrapper.find(".confirm").text()).toEqual("Confirm");
  });
  it("emit events with Confirm and Discard when clicked", () => {
    const wrapper = shallowMount(NotesComponent, {
      props: {
        title: "newTitle",
        content: "newContent",
        itemKey: "item_key",
        status: "editing",
      },
    });

    wrapper.find(".discard").trigger("click");
    wrapper.find(".confirm").trigger("click");

    expect(wrapper.emitted().discardUpdate).toBeTruthy();
    expect(wrapper.emitted().discardUpdate.length).toBe(1);
    expect(wrapper.emitted().discardUpdate[0]).toEqual(["item_key"]);

    expect(wrapper.emitted().confirmUpdate).toBeTruthy();
    expect(wrapper.emitted().confirmUpdate.length).toBe(1);
    expect(wrapper.emitted().confirmUpdate[0]).toEqual([
      "item_key",
      "newTitle",
      "newContent",
    ]);
  });

  it("renders props.title in input box when passed with props.status equals 'creating'", () => {
    const title = "new message";
    const wrapper = shallowMount(NotesComponent, {
      props: { title, status: "creating" },
    });
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find("input").element.value).toEqual(title);
  });
  it("renders props.content in input box when passed with props.status equals 'creating'", () => {
    const content = "new message";
    const wrapper = shallowMount(NotesComponent, {
      props: { content, status: "creating" },
    });
    expect(wrapper.find("textarea").exists()).toBe(true);
    expect(wrapper.find("textarea").element.value).toEqual(content);
  });
  it("renders two buttons('Create', 'Discard') when passed with props.status equals 'creating'", () => {
    const wrapper = shallowMount(NotesComponent, {
      props: { title: "a", content: "a", status: "creating" },
    });

    expect(wrapper.find(".discard").exists()).toBe(true);
    expect(wrapper.find(".confirm").exists()).toBe(true);
    expect(wrapper.find(".confirm").text()).toEqual("Create");
  });
  it("emit events with Create and Discard when clicked", () => {
    const wrapper = shallowMount(NotesComponent, {
      props: {
        title: "newTitle",
        content: "newContent",
        itemKey: "item_key",
        status: "creating",
      },
    });

    console.log(wrapper.html());
    wrapper.find(".discard").trigger("click");
    wrapper.find(".confirm").trigger("click");

    console.log(wrapper.emitted());

    expect(wrapper.emitted().discardCreate).toBeTruthy();
    expect(wrapper.emitted().discardCreate.length).toBe(0);

    expect(wrapper.emitted().confirmCreate).toBeTruthy();
    expect(wrapper.emitted().confirmCreate.length).toBe(1);
    expect(wrapper.emitted().confirmCreate[0]).toEqual([
      "item_key",
      "newTitle",
      "newContent",
    ]);
  });
});
