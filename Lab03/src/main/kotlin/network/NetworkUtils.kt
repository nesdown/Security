package network

import com.google.gson.Gson
import java.net.HttpURLConnection
import java.net.URL

fun getFirstNNumbersForLcg(accountId: Int, n: Int) = mutableListOf<Int>().apply {
    for (i in 1..n)
        add(makeBet("Lcg", accountId, 1, lastOrNull()?.toLong() ?: 1L).realNumber.toInt())
}.toList()

fun getFirstNNumbersForMt(accountId: Int, n: Int) = mutableListOf<Long>().apply {
    for (i in 1..n)
        add(makeBet("Mt", accountId, 1, 1).realNumber)
}.toList()

fun getFirstNNumbersForBetterMt(accountId: Int, n: Int) = mutableListOf<Long>().apply {
    for (i in 1..n)
        add(makeBet("BetterMt", accountId, 1, 1).realNumber)
}.toList()

fun createAccount(id: Int): Account =
    with(URL("http://95.217.177.249/casino/createacc?id=$id").openConnection() as HttpURLConnection) {
        requestMethod = "GET"
        inputStream.bufferedReader().use {
            Gson().fromJson(it.readLines().joinToString(), Account::class.java)
        }
    }

fun makeBet(mode: String, accountId: Int, moneyBet: Int, numberBet: Long): Bet =
    with(URL("http://95.217.177.249/casino/play$mode?id=$accountId&bet=$moneyBet&number=$numberBet").openConnection() as HttpURLConnection) {
        requestMethod = "GET"
        inputStream.bufferedReader().use {
            Gson().fromJson(it.readLines().joinToString(), Bet::class.java)
        }
    }

data class Account(
    val id: Int,
    val money: Int,
    val deletionTime: String
)

data class Bet(
    val message: String,
    val account: Account,
    val realNumber: Long
)