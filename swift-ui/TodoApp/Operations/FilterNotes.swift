import NimbusSwiftUI

struct Note: Decodable {
  var id: Int
  var title: String
  var description: String
  var date: Int
  var isDone: Bool

  func toMap() -> [String: Any] {
    [
      "id": id,
      "title": title,
      "description": description,
      "date": date,
      "isDone": isDone
    ]
  }
}

struct NoteSection: Decodable {
  var date: Int
  var items: [Note]

  func toMap() -> [String: Any] {
    [
      "date": date,
      "items": items.map { $0.toMap() }
    ]
  }
}

struct FilterNotes: OperationDecodable {
  static var properties = ["notes", "text", "todo", "done"]

  var notes: [NoteSection]
  var text: String
  var todo: Bool
  var done: Bool

  func execute() -> [Any] {
    notes.compactMap { section in
      let result = section.items.filter { note in
        let matchesTextFilter = text == "" || note.title.contains(text) || note.description.contains(text)
        let matchesDoneFilter = (todo && !note.isDone) || (done && note.isDone)
        return matchesTextFilter && matchesDoneFilter
      }
      return !result.isEmpty ? NoteSection(date: section.date, items: result).toMap() : nil
    }
  }
}
