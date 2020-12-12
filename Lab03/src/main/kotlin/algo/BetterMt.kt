package algo

import algo.BetterMt.Companion.MASK_B
import algo.BetterMt.Companion.MASK_C
import kotlin.math.floor

class BetterMt {

    companion object {

        private const val TO_UINT_FACTOR = 0xFFFFFFFFL
        private const val N = 624
        private const val M = 397
        private const val UPPER_MASK = 0x80000000.toInt()
        private const val LOWER_MASK = 0x7FFFFFFFL.toInt()
        const val MASK_C = 0xEFC60000.toInt()
        const val MASK_B = 0x9D2C5680.toInt()
        private const val MATRIX_A = 0x9908B0DF.toInt()
    }

    private val mtArr = IntArray(N)
    private var mtSize = 0

    fun setSeed(seed: List<Long>) {
        seed.forEachIndexed { index, l -> mtArr[index] = l.toInt() }
        twist()
    }

    fun next(): Long {
        if (mtSize >= N) twist()
        var res = mtArr[mtSize++]
        res = res xor (res ushr 11)
        res = res xor (res shl 7 and MASK_B)
        res = res xor (res shl 15 and MASK_C)
        res = res xor (res ushr 18)
        return res.toLong() and TO_UINT_FACTOR
    }

    private fun twist() {
        for (i in 0 until N) {
            val x = (mtArr[i] and UPPER_MASK) + (mtArr[(i + 1) % N] and LOWER_MASK)
            mtArr[i] = (mtArr[(i + M) % N] xor (x ushr 1))
            mtArr[i] = if (x and 1 > 0) mtArr[i] xor MATRIX_A else mtArr[i]
        }
        mtSize = 0
    }
}

fun crackBetterMt(list: List<Long>) = BetterMt().apply {
    setSeed(list.map { untemp(it) })
}

fun untemp(y: Long): Long {
    var res = undoRight(y, 18)
    res = undoLeft(res, 15, MASK_C.toLong())
    res = undoLeft(res, 7, MASK_B.toLong())
    res = undoRight(res, 11)
    return res
}

fun undoRight(y: Long, shift: Int): Long {
    var res = y.toInt()
    var i = shift
    while (i < 32) {
        res = res xor (y.toInt() ushr i)
        i += shift
    }
    return res.toLong()
}

fun undoLeft(y: Long, shift: Int, mask: Long): Long {
    var res = y
    var v = ((1 shl shift) - 1).toLong()
    var i = 0
    while (i < floor((32 / shift).toDouble())) {
        res = res xor (((v and res) shl shift) and mask)
        v = v shl shift
        i++
    }
    return res
}