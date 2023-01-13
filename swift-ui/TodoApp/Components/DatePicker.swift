import Foundation
import SwiftUI
import NimbusSwiftUI

extension Date {
  var millisecondsSince1970:Int64 {
    Int64((self.timeIntervalSince1970 * 1000.0).rounded())
  }
  
  init(milliseconds:Int64) {
    self = Date(timeIntervalSince1970: TimeInterval(milliseconds) / 1000)
  }
}

struct AppDatePicker: View, Decodable {
  var label: String
  var value: Int64?
  @StatefulEvent var onChange: (Int64) -> Void
  
  var body: some View {
    let binding = Binding(
      get: { value == nil ? Date.now : Date(milliseconds: value!) },
        set: {
          onChange($0.millisecondsSince1970)
        }
    )
    DatePicker(label, selection: binding, displayedComponents: [.date])
      .preferredColorScheme(.light)
      .environment(\.timeZone, TimeZone(secondsFromGMT: 0)!)
  }
}
