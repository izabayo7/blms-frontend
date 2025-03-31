import { Node } from 'tiptap'
import { chainCommands, exitCode } from 'prosemirror-commands'

export default class MathField extends Node {

    get name() {
        return 'math_field'
    }

    get schema() {
        return {
            inline: true,
            group: 'inline',
            selectable: false,
            parseDOM: [
                { tag: 'math-field[virtual-keyboard-mode]' },
            ],
            toDOM: () => ['math-field'],
        }
    }

    commands({ type }) {
        return () => chainCommands(exitCode, (state, dispatch) => {
            dispatch(state.tr.replaceSelectionWith(type.create()).scrollIntoView())
            return true
        })
    }

    // keys({ type }) {
    //     const command = chainCommands(exitCode, (state, dispatch) => {
    //         dispatch(state.tr.replaceSelectionWith(type.create()).scrollIntoView())
    //         return true
    //     })
    //     return {
    //         'Mod-Enter': command,
    //         'Shift-Enter': command,
    //     }
    // }

}
