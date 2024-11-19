import ipaddress
import socket

from common_ports import ports_and_services


def is_valid_ip(ip):
    try:
        ipaddress.ip_address(ip)
        return True
    except ValueError:
        return False


def is_valid_formatIPv4(ip):
    octets = ip.split(".")
    if len(octets) != 4:
        return False
    for octet in octets:
        if not octet.isdigit():
            return False
    return True


def get_open_ports(target, port_range, verbose=False):
    open_ports = []
    start_port, end_port = port_range

    if is_valid_ip(target):
        ip_address = target
    elif is_valid_formatIPv4(target):
        return "Error: Invalid IP address"
    else:
        try:
            ip_address = socket.gethostbyname(target)
        except socket.gaierror:
            return "Error: Invalid hostname"

    for port in range(start_port, end_port + 1):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(0.5)
        result = sock.connect_ex((ip_address, port))
        if result == 0:
            open_ports.append(port)
        sock.close()

    if verbose:
        try:
            hostname = socket.gethostbyaddr(ip_address)[0]
        except socket.herror:
            hostname = target

        if hostname == ip_address:
            open_ports_str = "Open ports for {}".format(ip_address)
        else:
            open_ports_str = "Open ports for {} ({})".format(hostname, ip_address)
        open_ports_str += "\nPORT     SERVICE\n"

        for port in open_ports:
            service_name = ports_and_services.get(port, "unknown")
            open_ports_str += "{:<9}{}\n".format(port, service_name)

        return open_ports_str.strip()

    return open_ports
