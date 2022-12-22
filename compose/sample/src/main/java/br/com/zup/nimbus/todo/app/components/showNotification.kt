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

import android.app.Activity
import android.content.Context
import android.graphics.Color
import android.graphics.Typeface
import android.view.Gravity
import android.view.View
import android.widget.FrameLayout
import android.widget.TextView
import br.com.zup.nimbus.annotation.AutoDeserialize
import br.com.zup.nimbus.compose.context
import br.com.zup.nimbus.compose.deserialization.DeserializationContext
import br.com.zup.nimbus.todo.app.R
import com.google.android.material.snackbar.BaseTransientBottomBar.LENGTH_LONG
import com.google.android.material.snackbar.BaseTransientBottomBar.LENGTH_SHORT
import com.google.android.material.snackbar.Snackbar

private const val LENGTH_LONG_DURATION = 3000L
private const val MARGIN = 16
private const val TEXT_SIZE = 20f
private const val TEXT_MAX_LINES = 3

@AutoDeserialize
fun showNotification(
    message: String,
    type: NotificationType,
    duration: Long? = LENGTH_LONG_DURATION,
    context: DeserializationContext
) {
    val nimbus = context.event?.scope?.nimbus
    val localContext = nimbus?.context()
    localContext?.let {
        showMessage(it, message, type, duration)
    }
}

enum class NotificationType {
    INFO,
    ERROR,
    WARNING
}

fun showMessage(
    context: Context,
    message: String,
    type: NotificationType,
    duration: Long? = LENGTH_LONG_DURATION,
) {
    val activity = (context as? Activity)
    val rootView = activity?.findViewById<View>(android.R.id.content)
    if (rootView != null) {
        val snack = Snackbar.make(rootView, message,
            duration?.toSnackbarDuration()
                ?: LENGTH_LONG
        )

        val view: View = snack.view
        configureSnackBarView(view, type)
        configureSnackBarText(view)

        snack.show()
    }
}

private fun configureSnackBarText(view: View) {
    val textView = view.findViewById<TextView>(R.id.snackbar_text)
    textView.setTextColor(Color.BLACK)
    textView.isAllCaps = true
    textView.textSize = TEXT_SIZE
    textView.setTypeface(null, Typeface.BOLD)
    textView.textAlignment = View.TEXT_ALIGNMENT_CENTER
    textView.maxLines = TEXT_MAX_LINES
}

private fun configureSnackBarView(view: View, type: NotificationType) {
    val params = view.layoutParams as FrameLayout.LayoutParams
    params.gravity = Gravity.TOP or Gravity.CENTER
    params.topMargin = MARGIN
    params.marginStart = MARGIN
    params.marginEnd = MARGIN
    view.setBackgroundColor(type.toColor())
    view.layoutParams = params
}

private fun Long.toSnackbarDuration() =
    if (this == LENGTH_LONG_DURATION) LENGTH_LONG else LENGTH_SHORT


private fun NotificationType.toColor(): Int =
    when (this) {
        NotificationType.INFO -> Color.GREEN
        NotificationType.ERROR -> Color.RED
        NotificationType.WARNING -> Color.YELLOW
    }
