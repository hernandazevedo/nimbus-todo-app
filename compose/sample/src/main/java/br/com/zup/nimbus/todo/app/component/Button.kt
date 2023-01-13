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

import androidx.compose.material.Button
import androidx.compose.material.ButtonDefaults
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import br.com.zup.nimbus.annotation.AutoDeserialize

@Composable
@AutoDeserialize
fun AppButton(
    text: String,
    primary: Boolean? = null,
    onPress: () -> Unit,
) {
    val primaryColors = ButtonDefaults.buttonColors(
        backgroundColor = Color(red = 95, green = 114, blue = 192),
        contentColor = Color.White,
    )
    val secondaryColors = ButtonDefaults.buttonColors(
        backgroundColor = Color(red = 241, green = 243, blue = 245),
        contentColor = Color.DarkGray,
    )
    Button(
        content = { Text(text) },
        onClick = onPress,
        colors = if (primary == true) primaryColors else secondaryColors,
    )
}
