package algo

import java.math.BigInteger

data class LcgParams(
    val multi: BigInteger,
    val shift: BigInteger,
    val modulus: BigInteger
)

fun lcg(prev: BigInteger, lcgParams: LcgParams) =
    (prev * lcgParams.multi + lcgParams.shift).mod(lcgParams.modulus).toInt()

fun findModulus(seq: List<BigInteger>): BigInteger =
    (0 until seq.size - 1).map {
        seq[it + 1] - seq[it]
    }.let { x ->
        (0 until x.size - 2).map {
            (x[it] * x[it + 2] - x[it + 1] * x[it + 1]).abs()
        }.let { z ->
            z.fold(z.first(), { acc, it -> acc.gcd(it) })
        }
    }

fun findMultiplier(elem0: BigInteger, elem1: BigInteger, elem2: BigInteger, mod: BigInteger): BigInteger {
    val diff1 = elem2 - elem1
    val diff2 = elem1 - elem0
    return (diff1 * diff2.modInverse(mod)).mod(mod)
}

fun findShift(elem0: BigInteger, elem1: BigInteger, multi: BigInteger, mod: BigInteger) =
    (elem1 - elem0 * multi).mod(mod)

fun crackLcg(input: List<Int>) =
    input.map {
        BigInteger.valueOf(it.toLong())
    }.let { list ->
        findModulus(list).let { modulus ->
            findMultiplier(list[0], list[1], list[2], modulus).let { multi ->
                findShift(list[0], list[1], multi, modulus).let { shift ->
                    val params = LcgParams(multi, shift, modulus)
                    (1 until list.size).fold(listOf(input[0])) { acc, i ->
                        acc + lcg(BigInteger.valueOf(acc.last().toLong()), params)
                    }.let { gen ->
                        params.takeIf {
                            list.indices.all {
                                gen[it] == input[it]
                            }
                        } ?: throw Exception("Not this time :(")
                    }
                }
            }
        }
    }