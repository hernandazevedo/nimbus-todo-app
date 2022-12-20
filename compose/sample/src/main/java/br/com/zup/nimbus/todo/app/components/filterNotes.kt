/*
 * Copyright 2023 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package br.com.zup.nimbus.todo.app.components

import br.com.zup.nimbus.annotation.AutoDeserialize

@AutoDeserialize
fun filterNotes(
    notes: Map<String, List<Note>>,
    text: String?,
    todo: Boolean,
    done: Boolean,
): Map<String, List<Note>> {
    val newMap: MutableMap<String, List<Note>> = mutableMapOf()
    notes.forEach { map ->
        val filteredList = map.value.filter {
            (text != null && it.description.contains(text) ||
                    text != null && it.title.contains(text)) &&
                    (
                        done && it.done ||
                        todo && it.done.not()
                    )
        }
        if (filteredList.isNotEmpty()) {
            newMap[map.key] = filteredList
        }
    }

    return newMap
}