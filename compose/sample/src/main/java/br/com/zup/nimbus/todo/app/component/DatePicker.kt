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

package br.com.zup.nimbus.todo.app.component

import android.widget.CalendarView
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.absoluteOffset
import androidx.compose.foundation.layout.wrapContentWidth
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import br.com.zup.nimbus.annotation.AutoDeserialize
import java.util.GregorianCalendar

@Composable
@AutoDeserialize
fun DatePicker(
    value: Long? = null,
    onChange: (value: Long) -> Unit,
) {
    val (firstRender, setFirstRender) = remember { mutableStateOf(true) }

    AndroidView(
        { CalendarView(it) },
        update = { views ->
            if (firstRender) views.date = value ?: System.currentTimeMillis()
            views.setOnDateChangeListener { _, year, month, day ->
                val date = GregorianCalendar(year, month - 1, day).time
                onChange(date.time)
            }
            setFirstRender(false)
        }
    )
}
