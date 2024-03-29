# [**Nimbus TODO APP**](https://github.com/ZupIT/nimbus-docs/) &middot; [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue)](https://github.com/ZupIT/nimbus-layout-compose/blob/main/LICENSE.txt)

> Article level: basic.

# Nimbus for Compose: Getting started
## Pre-requisites

- [Latest Android Studio (recommended)](https://developer.android.com/studio)
- [Java Development Kit (JDK) 1.8 or above](https://www.oracle.com/java/technologies/downloads/)
- [Jetpack Compose](https://developer.android.com/jetpack/compose)
- Android SDK: API 21 or above
- Kotlin 1.6 or above

# Installing
You can download the Nimbus library from mavenCentral by writing the following to your `build.gradle` file:

```
allprojects {
    repositories {
        mavenCentral()
    }
}
```

``` 
  // Nimbus compose base library
  implementation "br.com.zup.nimbus:nimbus-compose:${nimbusComposeVersion}". 
  // Recommended if you dont want to implement the layout components yourself
  implementation "br.com.zup.nimbus:nimbus-layout-compose:${nimbusComposeLayoutVersion}" 
```
Above, we added both the core Nimbus library and a component library for layout components. Our examples will use both, but if your project won't use the layout components, you don't need to the second dependency.

# Rendering your first server-driven screen

## Rendering with a endpoint url 


```kotlin
const val BASE_URL = "https://gist.githubusercontent.com/hernandazevedozup/eba4f2eb6afd6d6769a549fe037c1613/raw/cd3a897f4384783a1e799bb118a0dbfa8838fcf0"
class MainActivity : ComponentActivity() {
    // Here you define the configurations that nimbus will use to render the views.
    private val nimbus = Nimbus(
        baseUrl = BASE_URL,
        //The components is a map that defines for each component name how to render it
        components = layoutComponents,
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AppTheme {
                // A surface container using the 'background' color from the theme
                Surface(color = MaterialTheme.colors.background) {
                    // Providing the nimbus configuration to the render tree
                    ProvideNimbus(nimbus) {
                        // Here your start a navigation flow that requests the json of the first screen from $BASE_URL/1
                        NimbusNavigator(ViewRequest("/1"))
                    }
                }
            }
        }
    }
}
```

Run the application. You should see the following interface in the emulator's screen:
<img src="https://github.com/ZupIT/nimbus-layout-compose/blob/main/layout/screenshots/debug/br.com.zup.nimbus.compose.layout.LayoutFlexTest_test_layout_1.png" width="228"/>

## **Documentation**

You can find Nimbus's documentation at this link [**Nimbus Documentation**](https://github.com/ZupIT/nimbus-docs/).

[nimbus-docs]: https://github.com/ZupIT/nimbus-docs/

# Read next
:point_right: [Component](/components)

## **Running the sample project**

1. Cloning the repo
2. open the nimbus-layout-compose folder using Android Studio
3. Select the sample module run on emulator or device.

## **License**

[**Apache License 2.0**](https://github.com/ZupIT/nimbus-layout-compose/blob/main/LICENSE.txt).
