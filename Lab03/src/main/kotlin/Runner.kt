import algo.crackBetterMt
import algo.crackLcg
import algo.crackMt
import network.*
import kotlin.math.absoluteValue
import kotlin.random.Random

fun main() {
    lcg()
    mt()
    betterMt()
}

fun betterMt() {
    var acc = createAccount(Random.nextInt().absoluteValue)
    val list = getFirstNNumbersForBetterMt(acc.id, 624)
    val mt = crackBetterMt(list)

    while (acc.money < 1_000_000) {
        val betNum = mt.next()
        println("MONEY ${acc.money} $")
        makeBet("BetterMt", acc.id, 100, betNum).let {
            acc = it.account
        }
    }

    println("BetterMt: You are rich ;)")
}

fun mt() {
    var acc = createAccount(Random.nextInt().absoluteValue)
    val list = getFirstNNumbersForMt(acc.id, 5)

    val deletionDate = acc.deletionTime.parseDate()
    val mt = crackMt(list, deletionDate.toInt())

    while (acc.money < 1_000_000) {
        val betNum = mt.next()
        println("MONEY ${acc.money} $")
        makeBet("Mt", acc.id, 990, betNum).let {
            acc = it.account
        }
    }
    println("Mt: You are rich ;)")
}

fun lcg() {
    var acc = createAccount(Random.nextInt().absoluteValue)
    val list = getFirstNNumbersForLcg(acc.id, 30)
    val params = crackLcg(list)

    var prev = list.last()
    while (acc.money < 1_000_000) {
        println("MONEY ${acc.money} $")
        makeBet("Lcg", acc.id, 950, algo.lcg(prev.asBig(), params).toLong()).let {
            prev = it.realNumber.toInt()
            acc = it.account
        }
    }

    println("Lcg: You are rich ;)")
}