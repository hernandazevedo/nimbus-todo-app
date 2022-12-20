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

import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import br.com.zup.nimbus.annotation.AutoDeserialize
import br.com.zup.nimbus.annotation.Ignore

@Composable
@AutoDeserialize
fun Button(
    text: String,
    @Ignore modifier: Modifier = Modifier,
    enabled: Boolean? = null,
    radius: Double? = null,
    width: Double? = null,
    height: Double? = null,
    fontSize: Double? = null,
    onPress: () -> Unit,
) {
    var newModifier = modifier
    if (radius != null) {
        newModifier = newModifier.clip(RoundedCornerShape(radius.dp))
    }
    if (width != null) {
        newModifier = newModifier.width(width.dp)
    }
    if (height != null) {
        newModifier = newModifier.height(height.dp)
    }
    Button(
        modifier = newModifier,
        enabled = enabled ?: true,
        content = { Text(text, fontSize = fontSize?.sp ?: 12.sp) },
        onClick = onPress,
    )
}

@Preview
@Composable
fun ButtonSample() {

    Button(text = "+",
        radius = 50.0,
        modifier = Modifier.size(50.dp)
    ) {

    }

}