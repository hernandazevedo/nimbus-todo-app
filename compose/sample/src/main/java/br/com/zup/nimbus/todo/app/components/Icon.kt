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
import androidx.compose.foundation.layout.width
import androidx.compose.material.Icon
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Delete
import androidx.compose.material.icons.outlined.Search
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import br.com.zup.nimbus.annotation.AutoDeserialize
import br.com.zup.nimbus.compose.layout.extensions.color

enum class IconName { Search, Delete }

@Composable
@AutoDeserialize
fun AppIcon(
    name: IconName,
    color: String?,
    size: Double?,
) {
    val tint = color?.color ?: Color.Unspecified
    val iconSize = size ?: 20.0
    val modifier = Modifier.width(iconSize.dp).height(iconSize.dp)
    val icon = when (name) {
        IconName.Search -> Icons.Outlined.Search
        IconName.Delete -> Icons.Outlined.Delete
    }
    Icon(icon, "", modifier, tint)
}

