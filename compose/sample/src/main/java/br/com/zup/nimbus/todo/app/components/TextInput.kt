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

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.Icon
import androidx.compose.material.TextField
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.tooling.preview.Preview
import br.com.zup.nimbus.annotation.AutoDeserialize
import br.com.zup.nimbus.annotation.Ignore
import br.com.zup.nimbus.todo.app.getDrawableResByName

@Composable
@AutoDeserialize
fun TextInput(
    label: String,
    iconRight: String? = null,
    value: String? = null,
    type: TextInputType? = null,
    onChange: ((value: String) -> Unit)? = null,
    @Ignore modifier: Modifier = Modifier
) {
    val context = LocalContext.current

    TextField(
        value = value ?: "",
        keyboardOptions = KeyboardOptions(keyboardType = (type ?: TextInputType.Text).keyboard),
        onValueChange = { newValue -> onChange?.let { it(newValue) } },
        label = { androidx.compose.material.Text(label) },
        trailingIcon = {
            iconRight?.let {
                Icon(
                    painter = painterResource(context.getDrawableResByName(iconRight)),
                    contentDescription = it
                )
            }
        },
        modifier = modifier.fillMaxWidth(),

    )
}

enum class TextInputType(val keyboard: KeyboardType) {
    Text(KeyboardType.Text),
    Password(KeyboardType.Password),
    Email(KeyboardType.Email),
    Number(KeyboardType.Number),
}

@Preview
@Composable
fun TextInputSample() {
    TextInput(label = "Type here",
    iconRight = "search")
}