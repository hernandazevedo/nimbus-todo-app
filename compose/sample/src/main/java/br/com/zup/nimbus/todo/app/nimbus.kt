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

package br.com.zup.nimbus.todo.app

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import br.com.zup.nimbus.compose.Nimbus
import br.com.zup.nimbus.compose.layout.layoutUI
import br.com.zup.nimbus.compose.ui.NimbusComposeUILibrary
import br.com.zup.nimbus.todo.app.component.AppButton
import br.com.zup.nimbus.todo.app.component.AppIcon
import br.com.zup.nimbus.todo.app.component.CircularButton
import br.com.zup.nimbus.todo.app.component.DatePicker
import br.com.zup.nimbus.todo.app.component.SelectionGroup
import br.com.zup.nimbus.todo.app.component.Spinner
import br.com.zup.nimbus.todo.app.component.TextInput
import br.com.zup.nimbus.todo.app.component.Toast
import br.com.zup.nimbus.todo.app.component.formatDate

private val todoAppUI = NimbusComposeUILibrary("todoapp")
    .addComponent("button") @Composable { AppButton(it) }
    .addComponent("circularButton") @Composable { CircularButton(it) }
    .addComponent("textInput") @Composable { TextInput(it) }
    .addComponent("datePicker") @Composable { DatePicker(it) }
    .addComponent("icon") @Composable { AppIcon(it) }
    .addComponent("spinner") @Composable { Spinner() }
    .addComponent("selectionGroup") @Composable { SelectionGroup(it) }
    .addComponent("toast") @Composable { Toast(it) }
    .addOperation("formatDate") { formatDate(it) }

val nimbus = Nimbus(
    baseUrl = BASE_URL,
    ui = listOf(layoutUI, todoAppUI),
    loadingView = {
        Column(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Spinner()
        }
    }
)