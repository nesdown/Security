import java.math.BigInteger
import java.text.SimpleDateFormat
import java.util.concurrent.TimeUnit

val TIME_ZONE_DIFF = TimeUnit.HOURS.toSeconds(2)

fun Int.asBig() = BigInteger.valueOf(this.toLong())

fun Int.asInt32(): Long = toLong().let { x ->
    x.takeIf {
        it >= 0
    } ?: (x + Int.MAX_VALUE * 2L + 2)
}

fun String.parseDate() =
    SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss").parse(this).time / 1000 + TIME_ZONE_DIFF