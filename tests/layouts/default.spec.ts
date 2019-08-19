import Vue from "vue";
import Vuex from "vuex";
import { shallowMount } from "@vue/test-utils";
import LayoutDefault from "@/layouts/default.vue";

Vue.config.ignoredElements = [
    "router-view", "b-link", "b-dropdown", "b-dropdown-item",
];

Vue.use(Vuex);

// tslint:disable-next-line:no-empty
const $notify = () => { };

describe("layouts/default.vue", () => {
    const OLD_ENV = process.env;
    let mutations: any;
    let store: any;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV };
        delete process.env.NODE_ENV;

        mutations = {
            setContent: jest.fn(),
        };
        store = new Vuex.Store({
            state: {},
            mutations,
        });
    });

    afterEach(() => {
        process.env = OLD_ENV;
    });

    it("renders empty dropdown-item when empty array", () => {
        process.env.VUE_APP_USE_MOCK = "true";

        const wrapper = shallowMount(LayoutDefault, {
            mocks: { $notify },
        });

        expect(wrapper.text()).toMatch("Main Welcome to Vue.js world About us");
        expect(wrapper.contains("b-dropdown")).toBeTruthy();
        const elemDropDowns = wrapper.findAll("b-dropdown-item");
        expect(elemDropDowns.length).toBe(0);
    });

    it("renders dropdown-item according to data content when there is data in the array", () => {
        process.env.VUE_APP_USE_MOCK = "true";

        const wrapper = shallowMount(LayoutDefault, {
            mocks: { $notify },
        });

        wrapper.setData({ iframeContents: [{ id: 1, title: "title1", url: "url1" }, { id: 2, title: "title2", url: "url2" }] });

        expect(wrapper.text()).toMatch("Main Welcome to Vue.js world About us");
        expect(wrapper.contains("b-dropdown")).toBeTruthy();
        const elemDropDowns = wrapper.findAll("b-dropdown-item");
        expect(elemDropDowns.length).toBe(2);
        expect(elemDropDowns.at(0).name()).toBe("b-dropdown-item");
        expect(elemDropDowns.at(0).text()).toBe("title1");
        // expect(elemDropDowns.at(0).attributes()).toBe({ id: "1", title: "title1", url: "url1" });
        expect(elemDropDowns.at(1).name()).toBe("b-dropdown-item");
        expect(elemDropDowns.at(1).text()).toBe("title2");
        // expect(elemDropDowns.at(1).attributes()).toBe({ id: "2", title: "title2", url: "url2" });
    });

    it("commit vuex store with content data when select content", () => {
        process.env.VUE_APP_USE_MOCK = "true";

        const wrapper = shallowMount(LayoutDefault, {
            store,
            mocks: { $notify },
        });

        wrapper.setData({ iframeContents: [{ id: 1, title: "title1", url: "url1" }, { id: 2, title: "title2", url: "url2" }] });

        const spySelectContent = jest.spyOn(wrapper.vm as any, "selectContent");

        wrapper.findAll("b-dropdown-item").at(1).trigger("click");
        expect(spySelectContent).toHaveBeenCalledTimes(1);
        expect(spySelectContent).toHaveBeenCalledWith({ id: 2, title: "title2", url: "url2" });
        expect(mutations.setContent).toHaveBeenCalledTimes(1);

        wrapper.findAll("b-dropdown-item").at(0).trigger("click");
        expect(spySelectContent).toHaveBeenCalledTimes(2);
        expect(spySelectContent).toHaveBeenCalledWith({ id: 1, title: "title1", url: "url1" });
        expect(mutations.setContent).toHaveBeenCalledTimes(2);
    });

    it("not commit vuex store with content data when not select content", () => {
        process.env.VUE_APP_USE_MOCK = "true";

        const wrapper = shallowMount(LayoutDefault, {
            store,
            mocks: { $notify },
        });

        wrapper.setData({ iframeContents: [{ id: 1, title: "title1", url: "url1" }, { id: 2, title: "title2", url: "url2" }] });

        const spySelectContent = jest.spyOn(wrapper.vm as any, "selectContent");
        expect(mutations.setContent).not.toHaveBeenCalled();
        expect(spySelectContent).not.toHaveBeenCalled();
    });
});
