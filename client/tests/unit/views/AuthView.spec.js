import { mount } from "@vue/test-utils";
import AuthView from "@/views/AuthView.vue";

describe("AuthView", () => {
    test("renders a title", () => {
        const wrapper = mount(AuthView);
        expect(wrapper.find('[data-test="title"]').text()).toContain("해냄");
    });
});
