<template>
  <div :class="`kurious-editor ${template}`">
    <div class="editor">
      <editor-content v-if="!inverted" class="editor__content" :editor="editor"/>
      <editor-menu-bar
          v-if="mode === 'edit'"
          :editor="editor"
          v-slot="{ commands, isActive }"
      >
        <div class="menubar">
          <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.bold() }"
              @click="commands.bold"
          >
            <svg
                id="bold"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
              <path
                  id="Path_1886"
                  data-name="Path 1886"
                  d="M0,0H24V24H0Z"
                  fill="none"
              />
              <path
                  id="Path_1887"
                  data-name="Path 1887"
                  d="M8,11h4.5a2.5,2.5,0,0,0,0-5H8Zm10,4.5A4.5,4.5,0,0,1,13.5,20H6V4h6.5a4.5,4.5,0,0,1,3.256,7.606A4.5,4.5,0,0,1,18,15.5ZM8,13v5h5.5a2.5,2.5,0,1,0,0-5Z"
              />
            </svg>
          </button>

          <button
              type="button"
              class="menubar__button"
              @click="$emit('addmathlive')"
          >
            <svg
                id="bold"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
              <path
                  id="Path_1886"
                  data-name="Path 1886"
                  d="M0,0H24V24H0Z"
                  fill="none"
              />
              <path
                  id="Path_1887"
                  data-name="Path 1887"
                  d="M8,11h4.5a2.5,2.5,0,0,0,0-5H8Zm10,4.5A4.5,4.5,0,0,1,13.5,20H6V4h6.5a4.5,4.5,0,0,1,3.256,7.606A4.5,4.5,0,0,1,18,15.5ZM8,13v5h5.5a2.5,2.5,0,1,0,0-5Z"
              />
            </svg>
          </button>

          <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.italic() }"
              @click="commands.italic"
          >
            <svg
                id="italic"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
              <path
                  id="Path_1888"
                  data-name="Path 1888"
                  d="M0,0H24V24H0Z"
                  fill="none"
              />
              <path
                  id="Path_1889"
                  data-name="Path 1889"
                  d="M15,20H7V18H9.927L12.043,6H9V4h8V6H14.073L11.957,18H15Z"
              />
            </svg>
          </button>

          <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.strike() }"
              @click="commands.strike"
          >
            <svg
                id="strikethrough"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
              <path
                  id="Path_1882"
                  data-name="Path 1882"
                  d="M0,0H24V24H0Z"
                  fill="none"
              />
              <path
                  id="Path_1883"
                  data-name="Path 1883"
                  d="M17.154,14a4.181,4.181,0,0,1,.346,1.72,3.664,3.664,0,0,1-1.571,3.147A7.315,7.315,0,0,1,11.586,20a11.253,11.253,0,0,1-4.87-1.144V16.6a9.23,9.23,0,0,0,4.666,1.316q3.827,0,3.839-2.2a2.21,2.21,0,0,0-.648-1.6L14.453,14H3V12H21v2H17.154Zm-4.078-3H7.629a4.086,4.086,0,0,1-.481-.522A3.208,3.208,0,0,1,6.5,8.452,4.148,4.148,0,0,1,7.9,5.3,6.186,6.186,0,0,1,12.222,4a9.5,9.5,0,0,1,4.222.984V7.136A7.8,7.8,0,0,0,12.5,6.106q-3.72,0-3.719,2.346a1.344,1.344,0,0,0,.654,1.1,5.323,5.323,0,0,0,1.613.75q.93.27,2.03.7Z"
              />
            </svg>
          </button>

          <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.underline() }"
              @click="commands.underline"
          >
            <svg
                id="underline"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
              <path
                  id="Path_1884"
                  data-name="Path 1884"
                  d="M0,0H24V24H0Z"
                  fill="none"
              />
              <path
                  id="Path_1885"
                  data-name="Path 1885"
                  d="M8,3v9a4,4,0,0,0,8,0V3h2v9A6,6,0,0,1,6,12V3ZM4,20H20v2H4Z"
              />
            </svg>
          </button>

          <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.code() }"
              @click="commands.code"
          >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z"/>
            </svg>
          </button>

          <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.paragraph() }"
              @click="commands.paragraph"
          >
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                 focusable="false" width="1em" height="1em"
                 style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
                 preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
              <path d="M13 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4h-2v6H9V4h4m0 6a2 2 0 0 0 2-2a2 2 0 0 0-2-2h-2v4h2z"/>
            </svg>
          </button>

          <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 1 }) }"
              @click="commands.heading({ level: 1 })"
          >
            H1
          </button>

          <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 2 }) }"
              @click="commands.heading({ level: 2 })"
          >
            H2
          </button>

          <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 3 }) }"
              @click="commands.heading({ level: 3 })"
          >
            H3
          </button>

          <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.bullet_list() }"
              @click="commands.bullet_list"
          >
            <svg
                id="list-unordered"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
              <path
                  id="Path_1892"
                  data-name="Path 1892"
                  d="M0,0H24V24H0Z"
                  fill="none"
              />
              <path
                  id="Path_1893"
                  data-name="Path 1893"
                  d="M8,4H21V6H8ZM4.5,6.5A1.5,1.5,0,1,1,6,5,1.5,1.5,0,0,1,4.5,6.5Zm0,7A1.5,1.5,0,1,1,6,12,1.5,1.5,0,0,1,4.5,13.5Zm0,6.9A1.5,1.5,0,1,1,6,18.9a1.5,1.5,0,0,1-1.5,1.5ZM8,11H21v2H8Zm0,7H21v2H8Z"
              />
            </svg>
          </button>

          <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.ordered_list() }"
              @click="commands.ordered_list"
          >
            <svg
                id="list-ordered"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
              <path
                  id="Path_1880"
                  data-name="Path 1880"
                  d="M0,0H24V24H0Z"
                  fill="none"
              />
              <path
                  id="Path_1881"
                  data-name="Path 1881"
                  d="M8,4H21V6H8ZM5,3V6H6V7H3V6H4V4H3V3ZM3,14V11.5H5V11H3V10H6v2.5H4V13H6v1Zm2,5.5H3v-1H5V18H3V17H6v4H3V20H5ZM8,11H21v2H8Zm0,7H21v2H8Z"
              />
            </svg>
          </button>

          <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.blockquote() }"
              @click="commands.blockquote"
          >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z"/>
            </svg>
          </button>

          <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.code_block() }"
              @click="commands.code_block"
          >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M11,6.5V9.33L8.33,12L11,14.67V17.5L5.5,12M13,6.43L18.57,12L13,17.57V14.74L15.74,12L13,9.26M5,3C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H5Z"/>
            </svg>
          </button>

          <button
              type="button"
              class="menubar__button"
              @click="commands.horizontal_rule"
          >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,13H5V11H19V13Z"/>
            </svg>
          </button>

          <button type="button" class="menubar__button" @click="commands.undo">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z"/>
            </svg>
          </button>

          <button type="button" class="menubar__button" @click="commands.redo">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z"/>
            </svg>
          </button>
          <button
              type="button"
              class="menubar__button"
              @click="
              commands.createTable({
                rowsCount: 3,
                colsCount: 3,
                withHeaderRow: false,
              })
            "
          >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M5,4H19A2,2 0 0,1 21,6V18A2,2 0 0,1 19,20H5A2,2 0 0,1 3,18V6A2,2 0 0,1 5,4M5,8V12H11V8H5M13,8V12H19V8H13M5,14V18H11V14H5M13,14V18H19V14H13Z"/>
            </svg>
          </button>

          <span v-if="isActive.table()">
            <button
                type="button"
                class="menubar__button"
                @click="commands.deleteTable"
            >
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor"
          d="M15 19V17H23V19H15M4 3H18C19.11 3 20 3.9 20 5V12.08C18.45 11.82 16.92 12.18 15.68 13H12V17H13.08C12.97 17.68 12.97 18.35 13.08 19H4C2.9 19 2 18.11 2 17V5C2 3.9 2.9 3 4 3M4 7V11H10V7H4M12 7V11H18V7H12M4 13V17H10V13H4Z"/>
</svg>
            </button>
            <button
                type="button"
                class="menubar__button"
                @click="commands.addColumnBefore"
            >
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor"
          d="M13,2A2,2 0 0,0 11,4V20A2,2 0 0,0 13,22H22V2H13M20,10V14H13V10H20M20,16V20H13V16H20M20,4V8H13V4H20M9,11H6V8H4V11H1V13H4V16H6V13H9V11Z"/>
</svg>
            </button>
            <button
                type="button"
                class="menubar__button"
                @click="commands.addColumnAfter"
            >
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor"
          d="M11,2A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H2V2H11M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M15,11H18V8H20V11H23V13H20V16H18V13H15V11Z"/>
</svg>
            </button>
            <button
                type="button"
                class="menubar__button"
                @click="commands.deleteColumn"
            >
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor"
          d="M4,2H11A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M17.59,12L15,9.41L16.41,8L19,10.59L21.59,8L23,9.41L20.41,12L23,14.59L21.59,16L19,13.41L16.41,16L15,14.59L17.59,12Z"/>
</svg>
            </button>
            <button
                type="button"
                class="menubar__button"
                @click="commands.addRowBefore"
            >
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor"
          d="M22,14A2,2 0 0,0 20,12H4A2,2 0 0,0 2,14V21H4V19H8V21H10V19H14V21H16V19H20V21H22V14M4,14H8V17H4V14M10,14H14V17H10V14M20,14V17H16V14H20M11,10H13V7H16V5H13V2H11V5H8V7H11V10Z"/>
</svg>
            </button>
            <button
                type="button"
                class="menubar__button"
                @click="commands.addRowAfter"
            >
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor"
          d="M22,10A2,2 0 0,1 20,12H4A2,2 0 0,1 2,10V3H4V5H8V3H10V5H14V3H16V5H20V3H22V10M4,10H8V7H4V10M10,10H14V7H10V10M20,10V7H16V10H20M11,14H13V17H16V19H13V22H11V19H8V17H11V14Z"/>
</svg>
            </button>
            <button
                type="button"
                class="menubar__button"
                @click="commands.deleteRow"
            >
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor"
          d="M9.41,13L12,15.59L14.59,13L16,14.41L13.41,17L16,19.59L14.59,21L12,18.41L9.41,21L8,19.59L10.59,17L8,14.41L9.41,13M22,9A2,2 0 0,1 20,11H4A2,2 0 0,1 2,9V6A2,2 0 0,1 4,4H20A2,2 0 0,1 22,6V9M4,9H8V6H4V9M10,9H14V6H10V9M16,9H20V6H16V9Z"/>
</svg>
            </button>
            <button
                type="button"
                class="menubar__button"
                @click="commands.toggleCellMerge"
            >
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor"
          d="M5,10H3V4H11V6H5V10M19,18H13V20H21V14H19V18M5,18V14H3V20H11V18H5M21,4H13V6H19V10H21V4M8,13V15L11,12L8,9V11H3V13H8M16,11V9L13,12L16,15V13H21V11H16Z"/>
</svg>
            </button>
          </span>
        </div>
      </editor-menu-bar>
      <editor-content v-if="inverted" class="editor__content" :editor="editor"/>
      <editor-menu-bubble
          v-if="mode === 'edit'"
          :editor="editor"
          :keep-in-bounds="keepInBounds"
          v-slot="{ commands, isActive, menu }"
      >
        <div
            class="menububble"
            :class="{ 'is-active': menu.isActive }"
            :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
        >
          <button
              type="button"
              class="menububble__button"
              :class="{ 'is-active': isActive.bold() }"
              @click="commands.bold"
          >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z"/>
            </svg>
          </button>

          <button
              type="button"
              class="menububble__button"
              :class="{ 'is-active': isActive.italic() }"
              @click="commands.italic"
          >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z"/>
            </svg>
          </button>

          <button
              type="button"
              class="menububble__button"
              :class="{ 'is-active': isActive.code() }"
              @click="commands.code"
          >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z"/>
            </svg>
          </button>
        </div>
      </editor-menu-bubble>
    </div>
  </div>
</template>

<script>
import {Editor, EditorContent, EditorMenuBar, EditorMenuBubble} from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Table,
  Image,
  TableHeader,
  TableCell,
  TableRow,
} from "tiptap-extensions"

import MathField from '@/components/tiptap-extensions/newNode'

export default {
  props: {
    defaultContent: {
      type: String,
      default: `<p>Type or paste your content here</p>`,
    },
    mode: {
      type: String,
      default: "view",
    },
    inverted: {
      type: Boolean
    },
    template: {
      type: String,
      default: "wide",
    },
  },
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
  },
  data() {
    return {
      keepInBounds: true,
      editor: new Editor({
        editable: this.mode === "edit" ? true : false,
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({levels: [1, 2, 3]}),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Image(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Table({
            resizable: this.mode === "edit" ? true : false,
          }),
          new TableHeader(),
          new TableCell(),
          new TableRow(),
          new MathField()
        ],
        content: this.defaultContent,
      }),
    };
  },
  methods: {
    clearContent() {
      this.editor.clearContent(true);
      this.editor.focus();
    },
    setContent() {
      // you can pass a json document
      this.editor.setContent(
          {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "This is some inserted text. 👋",
                  },
                ],
              },
            ],
          },
          true
      );
      // HTML string is also supported
      // this.editor.setContent('<p>This is some inserted text. 👋</p>')
      this.editor.focus();
    },
    getHTML() {
      return this.editor.getHTML();
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/sass/editor/main.scss";

.kurious-editor {
  .actions {
    max-width: 30rem;
    margin: 0 auto 2rem auto;
  }

  .export {
    max-width: 30rem;
    margin: 0 auto 2rem auto;

    pre {
      padding: 1rem;
      border-radius: 5px;
      font-size: 0.8rem;
      font-weight: bold;
      background: rgba($color-black, 0.05);
      color: rgba($color-black, 0.8);
    }

    code {
      display: block;
      white-space: pre-wrap;
    }
  }

  .ProseMirror {
    &:focus {
      outline: none !important;
    }

    math-field {
      border-radius: 8px;
      padding: 8px;
      border: 1px solid rgba(0, 0, 0, .2);
      &:focus {
        outline: none !important;
      }
    }
  }
}
</style>