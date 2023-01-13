import SwiftUI

import NimbusSwiftUI
import NimbusLayoutSwiftUI

struct ContentView: View {  
  var body: some View {
    Nimbus(baseUrl: "http://127.0.0.1:3000") {
      NimbusNavigator(url: "/")
    }
    .ui([layout, todoLibrary])
  }
}

let todoLibrary = NimbusSwiftUILibrary("todoapp")
  .addComponent("spinner") { _ in
    AnyView(
      ProgressView()
        .progressViewStyle(
          CircularProgressViewStyle(
            tint: Color(red: 97/255, green: 107/255, blue: 118/255)
          )
        )
    )
  }
  .addComponent("button", AppButton.self)
  .addComponent("circularButton", CircularButton.self)
  .addComponent("textInput", TextInput.self)
  .addComponent("datePicker", AppDatePicker.self)
  .addComponent("icon", Icon.self)
  .addComponent("selectionGroup", SelectionGroup.self)
  .addComponent("toast", Toast.self)
  .addOperation("formatDate", FormatDate.self)
