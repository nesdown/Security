#Write a code to attack some simple substitution cipher. To reduce the complexity of this one we will use only uppercase letters, so the keyspace is only 26! To get this one right automatically you will probably need to use some sort of genetic algorithm (which worked the best last year), simulated annealing or gradient descent. Seriously, write it right now, you will need it to decipher the next one as well. Bear in mind, there©âÀñs no spaces. https://docs.google.com/document/d/1AWywcUIMoGr_cjOMaqjqeSyAyzK93icQE4W-6bDELfQ
import os, re, copy, pprint, pyperclip, simpleSubCipher, generate_word_pattern

# Создадим словарные паттерны для взаимодействия в рамках файла wordPatterns.py
if not os.path.exists('wordPatterns.py'):
    generate_word_patterns.main()

import wordPatterns
LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

spaces_letters_pattern = re.compile('[^A-Z\s]')
def main():
    message = 'EFFPQLEKVTVPCPYFLMVHQLUEWCNVWFYGHYTCETHQEKLPVMSAKSPVPAPVYWMVHQLUSPQLYWLASLFVWPQLMVHQLUPLRPSQLULQESPBLWPCSVRVWFLHLWFLWPUEWFYOTCMQYSLWOYWYETHQEKLPVMSAKSPVPAPVYWHEPPLUWSGYULEMQTLPPLUGUYOLWDTVSQETHQEKLPVPVSMTLEUPQEPCYAMEWWYTYWDLUULTCYWPQLSEOLSVOHTLUYAPVWLYGDALSSVWDPQLNLCKCLRQEASPVILSLEUMQBQVMQCYAHUYKEKTCASLFPYFLMVHQLUPQLHULIVYASHEUEDUEHQBVTTPQLVWFLRYGMYVWMVFLWMLSPVTTBYUNESESADDLSPVYWCYAMEWPUCPYFVIVFLPQLOLSSEDLVWHEUPSKCPQLWAOKLUYGMQEUEMPLUSVWENLCEWFEHHTCGULXALWMCEWETCSVSPYLEMQYGPQLOMEWCYAGVWFEBECPYASLQVDQLUYUFLUGULXALWMCSPEPVSPVMSBVPQPQVSPCHLYGMVHQLUPQLWLRPOEDVMETBYUFBVTTPENLPYPQLWLRPTEKLWZYCKVPTCSTESQPQULLGYAUMEHVPETFWMEHVPETBZMEHVPETB'
    # Определим варлидные шифротексты
    print('Hacking...')
    letter_map = simple_substitute(message)
    # Выведем процесс на экран
    print('Mapping:')
    pprint.pprint(letter_map)
    print()
    print('Original ciphertext:')
    print(message)
    print()
    print('Copying hacked message to clipboard:')
    result_messaging = decrypt_letter_mapping(message, letter_map)
    pyperclip.copy(result_messaging)
    print(result_messaging)

def get_blank_mapping():
 # Возвращаем словарь значений псевдошифровки
    return {'A': [], 'B': [], 'C': [], 'D': [], 'E': [], 'F': [], 'G': [], 'H': [], 'I': [], 'J': [], 'K': [], 'L': [], 'M': [], 'N': [], 'O': [], 'P': [], 'Q': [], 'R': [], 'S': [], 'T': [], 'U': [], 'V': [], 'W': [], 'X': [], 'Y': [], 'Z': []}

# Функция добавляет буквы к маппингу при псевдошифровании
def mapping_letters(letter_map, cipherword, candidate):
    # Создаем копию с клонированием, чтоб обратиться к предыдущей
    letter_map = copy.deepcopy(letter_map)
    for i in range(len(cipherword)):
        if candidate[i] not in letter_map[cipherword[i]]:
            letter_map[cipherword[i]].append(candidate[i])
    return letter_map


# Проверяем наложения маппингов из манипуляции выше
def rename_variant_map(mapA, mapB):
    intersector_map = get_blank_mapping()
    for letter in LETTERS:
        if mapA[letter] == []:
            intersector_map[letter] = copy.deepcopy(mapB[letter])
        elif mapB[letter] == []:
            intersector_map[letter] = copy.deepcopy(mapA[letter])
        else:
            for finalized_letter_symbol in mapA[letter]:
                if finalized_letter_symbol in mapB[letter]:
                    intersector_map[letter].append(finalized_letter_symbol)
     return intersector_map

 # Можем убрать буквы, которые расшифровали, и повторить процесс снова.
 def clear_solved_lettering(letter_map):
     letter_map = copy.deepcopy(letter_map)
     again_loop = True

     while again_loop:
          again_loop = False
          lettered_solution = []

          for cipherletter in LETTERS:
              if len(letter_map[cipherletter]) == 1:
                  lettered_solution.append(letter_map[cipherletter][0])

         for cipherletter in LETTERS:
             for s in lettered_solution:

                 if len(letter_map[cipherletter]) != 1 and s in letter_map[cipherletter]:
                     letter_map[cipherletter].remove(s)

                     if len(letter_map[cipherletter]) == 1:
                         again_loop = True

     return letter_map

# Найдем совпадение словесных паттернов в мапе, сгенерированной выще
 def simple_substitute(message):

     map_intersection = get_blank_mapping()
     ciphered_results = spaces_letters_pattern.sub('', message.upper()).split()

     for cipherword in ciphered_results:
         newMap = get_blank_mapping()
         wordPattern = generate_word_patterns.getWordPattern(cipherword)

         if wordPattern not in wordPatterns.allPatterns:
             continue

         for candidate in wordPatterns.allPatterns[wordPattern]:
             newMap = mapping_letters(newMap, cipherword, candidate)

         map_intersection = rename_variant_map(map_intersection, newMap)

     return clear_solved_lettering(map_intersection)

# Выполним функцию расшифровки применимо к мапе
 def decrypt_letter_mapping(ciphertext, letter_map):
     key = ['x'] * len(LETTERS)
     for cipherletter in LETTERS:
         if len(letter_map[cipherletter]) == 1:
             keyIndex = LETTERS.find(letter_map[cipherletter][0])
             key[keyIndex] = cipherletter

         else:
             ciphertext = ciphertext.replace(cipherletter.lower(), '_')
             ciphertext = ciphertext.replace(cipherletter.upper(), '_')
     
     key = ''.join(key)
     return simpleSubCipher.decryptMessage(key, ciphertext)

 if __name__ == '__main__':
     main()