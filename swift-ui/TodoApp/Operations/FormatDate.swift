import Foundation
import NimbusSwiftUI

struct FormatDate: OperationDecodable {
  static var properties = ["timeMillis"]

  var timeMillis: Int

  func execute() -> String? {
    let date = Date(timeIntervalSince1970: TimeInterval(timeMillis / 1000))
    let formatter = DateFormatter()
    formatter.dateFormat = "dd/MM/yyyy"
    formatter.timeZone = TimeZone(abbreviation: "UTC")
    return formatter.string(from: date)
  }
}
