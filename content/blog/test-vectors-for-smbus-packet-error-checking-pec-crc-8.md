Title: Test vectors for SMBus Packet Error Checking (PEC) CRC-8
Date: 2012-10-09 17:26
Author: xilun
Category: Hardware
Slug: test-vectors-for-smbus-packet-error-checking-pec-crc-8
Status: published

While implementing the SMBus on the MSP430 (see also the post "[An
engineering story](index.php?post/2012/09/29/An-engineering-story)"), I
have been looking for SMBus
[<abbrev title="Packet Error Checking">PEC</abbrev>](http://en.wikipedia.org/wiki/System_Management_Bus#Packet_Error_Checking "PEC")
CRC-8 test vectors but could not find any.

A CRC is a [Cyclic Redundancy
Check](http://en.wikipedia.org/wiki/Cyclic_redundancy_check). It is a
little piece of data typically added at the end of a packet and used to
check with an high reliability that no unintended error occurred during
transmission (or storage). The math to do the computation and the check
of a CRC is not very complicated and can be explained to anybody who
knows how to do a [long
division](http://en.wikipedia.org/wiki/Long_division). The polynomial
for the SMBus PEC CRC-8 is x\*\*8+x\*\*2+x\*\*1+1 -- this is a
polynomial in GF(2), but you don't really have to understand that part
to be able to use CRCs in practice. It corresponds to the binary number
100000111, to be used in a particular way. The following text explains
it better than I could:
[http://www.ross.net/crc/download/cr...](http://www.ross.net/crc/download/crc_v3.txt "http://www.ross.net/crc/download/crc_v3.txt")

I made my own SMBus PEC CRC-8 test vectors (attached to this post). The
format is one test vector per line, like:

TV(616263, 5F)

616263 is the 3-byte message in hexadecimal ("abc" in ASCII). The
resulting one byte CRC-8 in hex is 5F.

The test vectors are checked with an official [Java applet from
smbus.org](http://smbus.org/faq/crc8Applet.htm). They include at the
beginning the result for each one byte packet, which is also the table
for the fast byte based implementation: CRC = table\[CRC \^ byte\]
(because the initial value to use for CRC is zero), On the MSP430, this
implementation should run in something like 9 cycles per byte when
dropped in the right place. (xor CRC, Rm /\* 3 cycles \*/; mov
table\[Rm\], CRC; /\* 6 cycles \*/)

</p>

