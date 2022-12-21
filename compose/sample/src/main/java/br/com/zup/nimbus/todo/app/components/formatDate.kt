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

import android.text.format.DateFormat
import br.com.zup.nimbus.annotation.AutoDeserialize

const val DATE_FORMAT = "dd/MM/yyyy"

@AutoDeserialize
fun formatDate(timeMillis: Long): String = convertDate(timeMillis, DATE_FORMAT)

internal fun convertDate(dateInMilliseconds: Long, dateFormat: String?): String {
    return DateFormat.format(dateFormat, dateInMilliseconds).toString()
}
