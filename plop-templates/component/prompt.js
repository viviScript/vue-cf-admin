const { notEmpty } = require('../utils.js');
// 生成器的动作与行为
module.exports = {
  description: '生成Vue components组件',
  // 提示
  prompts: [{
    type: 'input',
    name: 'name',
    message: '请输入组件名字',
    // 校验
    validate: notEmpty('name')
  },
  {
    type: 'checkbox',
    name: 'blocks',
    message: 'Blocks:',
    choices: [{
      name: '<template>',
      value: 'template',
      checked: true
    },
    {
      name: '<script>',
      value: 'script',
      checked: true
    },
    {
      name: 'style',
      value: 'style',
      checked: true
    }
    ],
    validate(value) {
      if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
        return 'Components require at least a <script> or <template> tag.';
      }
      return true;
    }
  }
  ],
  actions: data => {
    const name = '{{properCase name}}';
    const actions = [{
      type: 'add',
      path: `src/components/${name}/index.vue`,
      templateFile: 'plop-templates/component/index.hbs',
      data: {
        name: name,
        template: data.blocks.includes('template'),
        script: data.blocks.includes('script'),
        style: data.blocks.includes('style')
      }
    }];

    return actions;
  }
};
