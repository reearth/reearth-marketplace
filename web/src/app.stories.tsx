import { useT } from "@marketplace/i18n";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "test",
} as ComponentMeta<any>;

const Template: ComponentStory<any> = _args => {
  const t = useT();
  return <h1>{t("hello")}</h1>;
};

export const Default = Template.bind({});
Default.args = {};
