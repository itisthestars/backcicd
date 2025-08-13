module.exports = {
    // 使用基础配置，避免版本兼容问题
    extends: ['stylelint-config-standard', 'stylelint-config-prettier'],

    // 添加规则插件
    plugins: ['stylelint-order'],

    // 为不同文件类型指定语法解析器
    overrides: [
        {
            files: ['**/*.vue'],
            customSyntax: 'postcss-html'
        },
        {
            files: ['**/*.less'],
            customSyntax: 'postcss-less'
        }
    ],

    // 忽略检测文件
    ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.json', '**/*.md', '**/*.yaml', 'stats.html'],

    // 自定义规则
    rules: {
        // 解决兼容性问题的规则
        'no-empty-source': null,
        'property-no-unknown': null,
        'selector-class-pattern': null,

        // Vue 相关规则
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global']
            }
        ],
        'selector-pseudo-element-no-unknown': [
            true,
            {
                ignorePseudoElements: ['v-deep']
            }
        ],

        // 允许厂商前缀
        'property-no-vendor-prefix': null,

        // 禁用过时的规则以避免错误
        'function-whitespace-after': null,
        'media-feature-range-operator-space-after': null,
        'media-feature-range-operator-space-before': null,
        'no-extra-semicolons': null,

        // 简化的属性顺序规则（可选）
        'order/properties-order': [
            'position',
            'top',
            'right',
            'bottom',
            'left',
            'z-index',
            'display',
            'margin',
            'padding',
            'width',
            'height',
            'font-size',
            'text-align',
            'color',
            'background',
            'border'
        ],

        'font-family-no-duplicate-names': null,
        'no-duplicate-selectors': null
    }
};
