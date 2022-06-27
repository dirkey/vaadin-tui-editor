/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import Editor from '@toast-ui/editor';
import {LitElement, html, PropertyValues} from 'lit';
import {customElement, property} from 'lit/decorators.js';

// import style from './toast-ui-style';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('toast-ui-lit-element')
export class ToastUILitElement extends LitElement {
  private editor: Editor | undefined;

  // static override styles = [style];

  @property()
  initialEditType: 'wysiwyg' | 'markdown' = 'markdown';

  @property()
  previewStyle: 'tab' | 'vertical' = 'vertical';

  @property({
    hasChanged(newVal: string, oldVal: string): boolean {
      const hasChanged: boolean = newVal !== oldVal;
      console.log(`${newVal}, ${oldVal}, ${hasChanged}`);
      return hasChanged;
    }
  })
  value: string = '';

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    const div = document.createElement('div');
    this.appendChild(div);
    this.editor = new Editor({
      el: div,
      height: 'auto',
      initialEditType: this.initialEditType,
      previewStyle: this.previewStyle
    });
    this.editor.addHook("change", () => {
      console.log("request an update");
      this.value = this.editor?.getMarkdown() ?? '';
    });
    this.editor.setMarkdown(this.value);
  }

  override render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-toast-ui-lit-element': ToastUILitElement;
  }
}
