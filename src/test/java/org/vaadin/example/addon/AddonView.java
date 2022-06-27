package org.vaadin.example.addon;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.router.Route;

@Route(value = "")
public class AddonView extends Div {
    private String memory = "";

    public AddonView() {
        ToastUIEditor editor = new ToastUIEditor();
        editor.setId("theAddon");
        editor.setValue("Hallo Zusammen");
        editor.addValueChangeListener(e -> {
            String message = "The value is now " + e.getValue();
            if (e.isFromClient()) {
                message += " (set by the user)";
            }
            Notification.show(message, 1000, Notification.Position.BOTTOM_END);
        });
        add(editor);
        Button resetText = new Button("Reset");
        resetText.addClickListener(e -> {
           editor.setValue("Reset text");
        });
        Button storeValue = new Button("Store");
        storeValue.addClickListener(e -> {
            this.memory = editor.getValue();
        });
        add(storeValue);
        add(resetText);
        Button resetCurrent = new Button("Reset from current memory");
        resetCurrent.addClickListener(e -> {
            editor.setValue(memory);
        });
        add(resetCurrent);

        Button getValue = new Button("get the value");
        getValue.addClickListener(e -> {
            System.out.println("Value is : " + editor.getValue());
        });
        add(getValue);
    }
}
