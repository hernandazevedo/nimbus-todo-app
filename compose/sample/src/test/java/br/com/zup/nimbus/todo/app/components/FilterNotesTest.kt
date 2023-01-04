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

import br.com.zup.nimbus.todo.app.component.filterNotes
import org.junit.Assert
import org.junit.Test
import java.util.Date

class FilterNotesTest {
    val date = Date()

    val notes = mapOf(
        "key1" to listOf(
            Note("ab", "ab", date.time, true),
            Note("bc", "bc", date.time, false),
            Note("cd", "cd", date.time, false),
            Note("ef", "ef", date.time, true),
        )
    )

    @Test
    fun testFilterNotes() {
        val expected = mapOf(
            "key1" to listOf(
                Note("ab", "ab", date.time, true),
                Note("bc", "bc", date.time, false)
            )
        )

        val actual = filterNotes(notes, "b", true, true)
        Assert.assertEquals(expected, actual)
    }

    @Test
    fun testFilterNotes1() {
        val expected = mapOf(
            "key1" to listOf(
                Note("bc", "bc", date.time, false)
            )
        )

        val actual = filterNotes(notes, "b", true, false)
        Assert.assertEquals(expected, actual)
    }

    @Test
    fun testFilterNotes2() {
        val expected = emptyMap<String, List<Note>>()

        val actual = filterNotes(notes, "f", false, false)
        Assert.assertEquals(expected, actual)
    }

    @Test
    fun testFilterNotes3() {
        val expected = mapOf(
            "key1" to listOf(
                Note("bc", "bc", date.time, false),
                Note("cd", "cd", date.time, false),
            )
        )

        val actual = filterNotes(notes, "c", true, false)
        Assert.assertEquals(expected, actual)
    }
}