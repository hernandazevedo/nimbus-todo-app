import SwiftUI
import NimbusLayoutSwiftUI

struct ContentView: View {
  var body: some View {
    Nimbus(baseUrl: "base") {
      NimbusNavigator(json: """
      {
        "_:component": "layout:column",
        "children": [
          {
            "_:component": "layout:text",
            "properties": {
              "text": "Hello!"
            }
          }
        ]
      }
      """)
    }
    .ui([layout])
  }
}

struct ContentView_Previews: PreviewProvider {
  static var previews: some View {
    ContentView()
  }
}
