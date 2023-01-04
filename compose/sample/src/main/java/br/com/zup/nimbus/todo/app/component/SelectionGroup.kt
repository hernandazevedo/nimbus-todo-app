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

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import br.com.zup.nimbus.annotation.AutoDeserialize

private val unselectedColor = Color(red = 95, green = 114, blue = 192)
private val selectedColor = Color(red = 76, green = 91, blue = 145)

@Composable
@AutoDeserialize
fun SelectionGroup(
    options: List<String>,
    value: String,
    onChange: (String) -> Unit,
) {
    Row(Modifier
        .border(width = 1.dp, color = selectedColor, shape = RoundedCornerShape(8.dp))
        .clip(RoundedCornerShape(8.dp))
        .background(selectedColor)
    ) {
        options.forEachIndexed { index, option ->
            val isLastItem = index == options.size - 1
            Box(Modifier
                .clickable { onChange(option) }
                .padding(end = (if (isLastItem) 0 else 1).dp)
                .background(if (value == option) Color.Transparent else unselectedColor)
                .padding(horizontal = 10.dp, vertical = 8.dp)
            ) {
                Text(option, color = Color.White, fontSize = 13.sp)
            }
        }
    }
}
