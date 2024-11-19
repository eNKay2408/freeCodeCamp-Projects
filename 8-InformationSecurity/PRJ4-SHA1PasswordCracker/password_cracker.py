import hashlib


def sha1_hash(password):
    return hashlib.sha1(password.encode()).hexdigest()


def load_file(file_path):
    with open(file_path, "r") as file:
        return [line.strip() for line in file]


def crack_sha1_hash(hash, use_salts=False):
    passwords = load_file("top-10000-passwords.txt")

    if use_salts == True:
        salts = load_file("known-salts.txt")
    else:
        salts = [""]

    for password in passwords:
        for salt in salts:
            salted_passwords = [salt + password, password + salt]
            for salted_password in salted_passwords:
                if sha1_hash(salted_password) == hash:
                    return password

    return "PASSWORD NOT IN DATABASE"
