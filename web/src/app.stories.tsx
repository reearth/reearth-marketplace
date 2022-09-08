import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "test",
} as ComponentMeta<any>;

const Template: ComponentStory<any> = _args => {
  return <h1>hello</h1>;
};

export const Default = Template.bind({});
Default.args = {};
