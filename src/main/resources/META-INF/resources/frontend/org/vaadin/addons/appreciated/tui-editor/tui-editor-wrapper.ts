import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/polymer/lib/utils/html-tag.js';
// import 'tui-image-editor/dist/tui-image-editor.css';
import Editor from "@toast-ui/editor";

//import {WhiteTheme} from "./tui-editor-white-theme";
// import {BlackTheme} from "./tui-editor-black-theme";

class TuiEditorWrapper extends PolymerElement {
    private editor: Editor | undefined;
    private changeFromEditor: boolean = false;

    static get template() {
        return html`
            <div>
                <slot></slot>
            </div>
        `;
    }

    static get is() {
        return 'tui-editor-wrapper'
    }

    static get properties() {
        return {
            value: {
                type: String,
                notify: true,
                value: '',
            },
            enable: {
                type: Boolean,
                value: true
            },
            editor: {
                type: Editor
            }
        }
    }

    ready() {
        super.ready();
        // This is a workaround for libraries that are trying to access the element in which they operated via the
        // normal dom. The solution is to add the element in which the library operate to the actual dom by
        // appending elements to a slot of this element.
        const div = document.createElement('div');
        this.appendChild(div);
        // Passing the properties set from the server-side to the Image Editor
        this.editor = new Editor({
            el: div,
            height: 'auto',
            initialEditType: 'markdown',
            previewStyle: 'vertical'
        });
        this.editor.setMarkdown(this.value);
        this.editor.addHook("change", () => {
            this.changeFromEditor = true;
            this.value = this.editor?.getMarkdown() ?? '';
        });
        this.addEventListener('value-changed', () => {
            if (!this.changeFromEditor) {
                console.log("Update editor content");
                this.editor?.setMarkdown(this.value);
            }
            this.changeFromEditor = false;
        });
    }
}

customElements.define(TuiEditorWrapper.is, TuiEditorWrapper);
export {TuiEditorWrapper};