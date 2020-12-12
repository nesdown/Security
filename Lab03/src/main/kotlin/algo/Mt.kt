package algo

import asInt32

class Mt {

    companion object {
        private val K = intArrayOf(0x0, -0x66f74f21)
        private const val N = 624
        private const val M = 397
        private const val LOWER_MASK = 0x7fffffff
        private const val UPPER_MASK = -0x80000000
        private const val OUT_FACTOR1 = -0x62d3a980
        private const val OUT_FACTOR2 = -0x103a0000
        private const val GENERATION_FACTOR = 1812433253
    }

    private val mtArr: IntArray = IntArray(N)
    private var mtSize = 0

    fun setSeed(seed: Int) {
        mtArr[0] = seed
        mtSize = 1
        while (mtSize < N) {
            mtArr[mtSize] = GENERATION_FACTOR * (mtArr[mtSize - 1] xor (mtArr[mtSize - 1] ushr 30)) + mtSize
            mtSize++
        }
    }

    fun next(): Long {
        var res: Int
        var i: Int
        if (mtSize >= N) {
            i = 0
            while (i < N - M) {
                res = mtArr[i] and UPPER_MASK or (mtArr[i + 1] and LOWER_MASK)
                mtArr[i] = mtArr[i + M] xor (res ushr 1) xor K[res and 0x1]
                i++
            }
            while (i < N - 1) {
                res = mtArr[i] and UPPER_MASK or (mtArr[i + 1] and LOWER_MASK)
                mtArr[i] = mtArr[i + (M - N)] xor (res ushr 1) xor K[res and 0x1]
                i++
            }
            res = mtArr[N - 1] and UPPER_MASK or (mtArr[0] and LOWER_MASK)
            mtArr[N - 1] = mtArr[M - 1] xor (res ushr 1) xor K[res and 0x1]
            mtSize = 0
        }
        res = mtArr[mtSize++]
        res = res xor (res ushr 11)
        res = res xor (res shl 7 and OUT_FACTOR1)
        res = res xor (res shl 15 and OUT_FACTOR2)
        res = res xor (res ushr 18)
        return res.asInt32()
    }
}

fun crackMt(checkList: List<Long>, start: Int): Mt {
    var i = start
    while (i > 0) {
        if (i % 1000 == 0) println(i)
        Mt().apply {
           setSeed(i)
        }.let { mt ->
            if (checkList.all {
                it == mt.next()
            }) return mt
        }
        i--
    }
    return Mt()
}