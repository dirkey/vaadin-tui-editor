package org.vaadin.example.addon;

import com.vaadin.flow.component.AbstractSinglePropertyField;
import com.vaadin.flow.component.HasEnabled;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.dependency.StyleSheet;

// @Tag("toast-ui-lit-element")
@Tag("tui-editor-wrapper")
@NpmPackage(value = "@toast-ui/editor", version = "^3.1.7")
@JsModule("./org/vaadin/addons/appreciated/tui-editor/tui-editor-wrapper.ts")
@StyleSheet("https://uicdn.toast.com/editor/latest/toastui-editor.min.css")
public class ToastUIEditor extends AbstractSinglePropertyField<ToastUIEditor, String> implements HasEnabled {

    public ToastUIEditor() {
        super("value", "", true);
    }
}
