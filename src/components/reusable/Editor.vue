<template>
  <div id="kurious-editor">
    <div class="editor">
      <editor-content class="editor__content" :editor="editor" />
      <editor-menu-bar
        v-if="mode === 'edit'"
        class="elevation-1"
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
            <v-icon>mdi-format-bold</v-icon>
          </button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <v-icon>mdi-format-italic</v-icon>
          </button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <v-icon>mdi-format-strikethrough-variant</v-icon>
          </button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <v-icon>mdi-format-underline</v-icon>
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
            <v-icon>mdi-format-paragraph</v-icon>
          </button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >H1</button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >H2</button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >H3</button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <v-icon>mdi-format-list-bulleted</v-icon>
          </button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <v-icon>mdi-format-list-numbered</v-icon>
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

          <button type="button" class="menubar__button" @click="commands.horizontal_rule">
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
            @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })"
          >
            <v-icon>mdi-table</v-icon>
          </button>

          <span v-if="isActive.table()">
            <button type="button" class="menubar__button" @click="commands.deleteTable">
              <v-icon>mdi-table-minus</v-icon>
            </button>
            <button type="button" class="menubar__button" @click="commands.addColumnBefore">
              <v-icon>mdi-table-column-plus-before</v-icon>
            </button>
            <button type="button" class="menubar__button" @click="commands.addColumnAfter">
              <v-icon>mdi-table-column-plus-after</v-icon>
            </button>
            <button type="button" class="menubar__button" @click="commands.deleteColumn">
              <v-icon>mdi-table-column-remove</v-icon>
            </button>
            <button type="button" class="menubar__button" @click="commands.addRowBefore">
              <v-icon>mdi-table-row-plus-before</v-icon>
            </button>
            <button type="button" class="menubar__button" @click="commands.addRowAfter">
              <v-icon>mdi-table-row-plus-after</v-icon>
            </button>
            <button type="button" class="menubar__button" @click="commands.deleteRow">
              <v-icon>mdi-table-row-remove</v-icon>
            </button>
            <button type="button" class="menubar__button" @click="commands.toggleCellMerge">
              <v-icon>mdi-table-merge-cells</v-icon>
            </button>
          </span>
        </div>
      </editor-menu-bar>
      <editor-menu-bubble
        v-if="mode === 'edit'"
        class="elevation-1"
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
</style>