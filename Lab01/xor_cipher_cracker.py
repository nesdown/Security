import sys
import operator
import binascii
import itertools

# Простой класс, генерирующий ввсе н-битные ключи
class XORCipherCracker():

# В инициализаторе берем последовательность символов
    def __init__(self, text_cyphered_symbols):
        self.text_cyphered_symbols = text_cyphered_symbols

    def crack(self, binary_cipher_of_text):
        key_length_probability = self.find_likely_key_lengths(binary_cipher_of_text)
        key_length_to_be, probability = key_length_probability[0]

        # Какие н-битные ключи вообще могут быть?
        possible_keys = ["".join(bit) for bit in itertools.product("01", repeat=key_length_to_be)]

        keys = self.find_likely_keys(possible_keys, binary_cipher_of_text)

        # Тут будем собирать все что нарасшифровывали
        decryptions = {}
        for key in keys:
            print(str(key))
            text_plain_variants = self.decrypt_with_key(key, binary_cipher_of_text)
            if text_plain_variants:
                decryptions[key] = text_plain_variants

        # Если варианты нашлись, то будем их показывать
        return decryptions

    def find_likely_key_lengths(self, cipher_text):
        possible_key_lengths = {}
        for key_length in range(2, 32):
            hamming_distances = position = counter = 0
            # вычисляем расстояние хемминга
            # размеры тестируются по длинне возможного ключа
            while(position + 2 * key_length <= len(cipher_text)):
                section_one = cipher_text[position:position+key_length]
                position += key_length
                section_two = cipher_text[position:position+key_length]
                position += key_length
                hamming_distances += self.calculate_hamming_distance(section_one, section_two)
                counter += 1
            average_hamming_distance = hamming_distances / float(counter)

            # выполним нормализацию
            possible_key_lengths[key_length] = average_hamming_distance / float(key_length)

        # длина ключа с самым низким средним скорее всего наиболее подходящая
        return sorted(possible_key_lengths.items(), key=operator.itemgetter(1), reverse=False)

    
    def calculate_hamming_distance(self, string_one, string_two):
        count = 0.0
        for i in range(len(string_one)):
            if string_one[i] != string_two[i]:
                count += 1
        return count

    # найдем ключи, которые возвращают только валидные значения
    def find_likely_keys(self, possible_keys, binary_cipher_of_text):
        keys = []
        for possible_key in possible_keys:
            if self.does_key_produce_only_legal_chars(possible_key, binary_cipher_of_text
    ):
                keys.append(possible_key)
        return keys

    # при ксоре, длина ключа равна длине блока шифрованного текста?
    def does_key_produce_only_legal_chars(self, possible_key, binary_cipher_of_text):
        section = 0
        while section < len(binary_cipher_of_text
):
            portion = binary_cipher_of_text
    [section: section+len(possible_key)]
            xor_result = int(possible_key, 2) ^ int(portion, 2)
            try:
                text_plain_variants_letter = binascii.unhexlify('%x' % xor_result)
                for char in list(text_plain_variants_letter):
                    if char.lower() not in self.text_cyphered_symbols:
                        return False
            except TypeError:
                return False
            section += len(possible_key)
        return True

    def decrypt_with_key(self, key, binary_cipher_of_text):
        repeated_key = self.repeat_key_to_length(key, len(binary_cipher_of_text
))
        return int(repeated_key, 2) ^ int(binary_cipher_of_text
, 2)

    def repeat_key_to_length(self, key, cipher_text_length):
        repeat_key = (key * ((cipher_text_length / len(key)) + 1))
        return repeat_key[:cipher_text_length]