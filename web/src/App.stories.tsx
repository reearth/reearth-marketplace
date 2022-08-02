import { ComponentStory, ComponentMeta } from "@storybook/react";

import { useT } from "@/i18n";

export default {
  title: "test",
} as ComponentMeta<any>;

const Template: ComponentStory<any> = _args => {
  const t = useT();
  return <h1>{t("hello")}</h1>;
};

export const Default = Template.bind({});
Default.args = {};
