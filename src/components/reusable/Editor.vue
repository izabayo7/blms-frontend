<template>
  <div :class="`kurious-editor ${template}`">
    <div class="editor">
      <editor-content v-if="!inverted" class="editor__content" :editor="editor" />
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
            <v-icon>mdi-code-tags</v-icon>
          </button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M13 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4h-2v6H9V4h4m0 6a2 2 0 0 0 2-2a2 2 0 0 0-2-2h-2v4h2z"/></svg>
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
            <v-icon>mdi-format-quote-close</v-icon>
          </button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <v-icon>mdi-code-not-equal-variant</v-icon>
          </button>

          <button
            type="button"
            class="menubar__button"
            @click="commands.horizontal_rule"
          >
            <v-icon>mdi-minus</v-icon>
          </button>

          <button type="button" class="menubar__button" @click="commands.undo">
            <v-icon>mdi-undo</v-icon>
          </button>

          <button type="button" class="menubar__button" @click="commands.redo">
            <v-icon>mdi-redo</v-icon>
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
            <v-icon>mdi-table</v-icon>
          </button>

          <span v-if="isActive.table()">
            <button
              type="button"
              class="menubar__button"
              @click="commands.deleteTable"
            >
              <v-icon>mdi-table-minus</v-icon>
            </button>
            <button
              type="button"
              class="menubar__button"
              @click="commands.addColumnBefore"
            >
              <v-icon>mdi-table-column-plus-before</v-icon>
            </button>
            <button
              type="button"
              class="menubar__button"
              @click="commands.addColumnAfter"
            >
              <v-icon>mdi-table-column-plus-after</v-icon>
            </button>
            <button
              type="button"
              class="menubar__button"
              @click="commands.deleteColumn"
            >
              <v-icon>mdi-table-column-remove</v-icon>
            </button>
            <button
              type="button"
              class="menubar__button"
              @click="commands.addRowBefore"
            >
              <v-icon>mdi-table-row-plus-before</v-icon>
            </button>
            <button
              type="button"
              class="menubar__button"
              @click="commands.addRowAfter"
            >
              <v-icon>mdi-table-row-plus-after</v-icon>
            </button>
            <button
              type="button"
              class="menubar__button"
              @click="commands.deleteRow"
            >
              <v-icon>mdi-table-row-remove</v-icon>
            </button>
            <button
              type="button"
              class="menubar__button"
              @click="commands.toggleCellMerge"
            >
              <v-icon>mdi-table-merge-cells</v-icon>
            </button>
          </span>
        </div>
      </editor-menu-bar>
      <editor-content v-if="inverted" class="editor__content" :editor="editor" />
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
            <v-icon>mdi-format-bold</v-icon>
          </button>

          <button
            type="button"
            class="menububble__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <v-icon>mdi-format-italic</v-icon>
          </button>

          <button
            type="button"
            class="menububble__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <v-icon>mdi-code-tags</v-icon>
          </button>
        </div>
      </editor-menu-bubble>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from "tiptap";
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
} from "tiptap-extensions";
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
          new Heading({ levels: [1, 2, 3] }),
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
.kurious-editor{
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
  .ProseMirror:focus {
    outline: none !important;
  }
}
</style>