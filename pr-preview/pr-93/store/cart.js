const JB_LOADER_URI = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSItMzI4LjgwNDUgLTMyOC44MDQ1IDg3Ni44MTIgODc2LjgxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxzdHlsZT4KICAgICAgICAuYW5pbWF0ZWQtcGF0aCB7CiAgICAgICAgICAgIGZpbGw6IG5vbmU7CiAgICAgICAgICAgIHN0cm9rZS13aWR0aDogMThweDsKICAgICAgICAgICAgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kOwogICAgICAgIH0KCiAgICAgICAgLnNlZ21lbnQtMSB7IHN0cm9rZTogI0E4MTMxMzsgYW5pbWF0aW9uOiBzdHJldGNoLTEgMjRzIGluZmluaXRlIGxpbmVhcjsgfQogICAgICAgIC5zZWdtZW50LTIgeyBzdHJva2U6ICM0NTc2QUI7IGFuaW1hdGlvbjogc3RyZXRjaC0yIDI0cyBpbmZpbml0ZSBsaW5lYXI7IH0KICAgICAgICAuc2VnbWVudC0zIHsgc3Ryb2tlOiAjNkZCQ0NCOyBhbmltYXRpb246IHN0cmV0Y2gtMyAyNHMgaW5maW5pdGUgbGluZWFyOyB9CgogICAgICAgIEBrZXlmcmFtZXMgc3RyZXRjaC0xIHsKICAgICAgICAgICAgMCUgICAgICB7IHN0cm9rZS1kYXNoYXJyYXk6IDQuMTUgMTAwMDsgc3Ryb2tlLWRhc2hvZmZzZXQ6IC04LjM4OyAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKTsgfQogICAgICAgICAgICA2LjI1JSAgIHsgc3Ryb2tlLWRhc2hhcnJheTogMzMuMyAxMDAwOyBzdHJva2UtZGFzaG9mZnNldDogLTY2LjcyOyAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDEyLjUlICAgeyBzdHJva2UtZGFzaGFycmF5OiA0LjE1IDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtOTUuODg7ICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSk7IH0KICAgICAgICAgICAgMTguNzUlICB7IHN0cm9rZS1kYXNoYXJyYXk6IDMzLjMgMTAwMDsgc3Ryb2tlLWRhc2hvZmZzZXQ6IC0xNTQuMjI7IGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKTsgfQogICAgICAgICAgICAyNSUgICAgIHsgc3Ryb2tlLWRhc2hhcnJheTogNC4xNSAxMDAwOyBzdHJva2UtZGFzaG9mZnNldDogLTE4My4zODsgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDMxLjI1JSAgeyBzdHJva2UtZGFzaGFycmF5OiAzMy4zIDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtMjQxLjcyOyBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSk7IH0KICAgICAgICAgICAgMzcuNSUgICB7IHN0cm9rZS1kYXNoYXJyYXk6IDQuMTUgMTAwMDsgc3Ryb2tlLWRhc2hvZmZzZXQ6IC0yNzAuODg7IGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKTsgfQogICAgICAgICAgICA0My43NSUgIHsgc3Ryb2tlLWRhc2hhcnJheTogMzMuMyAxMDAwOyBzdHJva2UtZGFzaG9mZnNldDogLTMyOS4yMjsgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDUwJSAgICAgeyBzdHJva2UtZGFzaGFycmF5OiA0LjE1IDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtMzU4LjM4OyBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSk7IH0KICAgICAgICAgICAgNTYuMjUlICB7IHN0cm9rZS1kYXNoYXJyYXk6IDMzLjMgMTAwMDsgc3Ryb2tlLWRhc2hvZmZzZXQ6IC00MTYuNzI7IGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKTsgfQogICAgICAgICAgICA2Mi41JSAgIHsgc3Ryb2tlLWRhc2hhcnJheTogNC4xNSAxMDAwOyBzdHJva2UtZGFzaG9mZnNldDogLTQ0NS44ODsgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDY4Ljc1JSAgeyBzdHJva2UtZGFzaGFycmF5OiAzMy4zIDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtNTA0LjIyOyBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSk7IH0KICAgICAgICAgICAgNzUlICAgICB7IHN0cm9rZS1kYXNoYXJyYXk6IDQuMTUgMTAwMDsgc3Ryb2tlLWRhc2hvZmZzZXQ6IC01MzMuMzg7IGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKTsgfQogICAgICAgICAgICA4MS4yNSUgIHsgc3Ryb2tlLWRhc2hhcnJheTogMzMuMyAxMDAwOyBzdHJva2UtZGFzaG9mZnNldDogLTU5MS43MjsgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDg3LjUlICAgeyBzdHJva2UtZGFzaGFycmF5OiA0LjE1IDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtNjIwLjg4OyBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSk7IH0KICAgICAgICAgICAgOTMuNzUlICB7IHN0cm9rZS1kYXNoYXJyYXk6IDMzLjMgMTAwMDsgc3Ryb2tlLWRhc2hvZmZzZXQ6IC02NzkuMjI7IGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKTsgfQogICAgICAgICAgICAxMDAlICAgIHsgc3Ryb2tlLWRhc2hhcnJheTogNC4xNSAxMDAwOyBzdHJva2UtZGFzaG9mZnNldDogLTcwOC4zODsgfQogICAgICAgIH0KCiAgICAgICAgQGtleWZyYW1lcyBzdHJldGNoLTIgewogICAgICAgICAgICAwJSAgICAgIHsgc3Ryb2tlLWRhc2hhcnJheTogNC4xNSAxMDAwOyBzdHJva2UtZGFzaG9mZnNldDogLTQuMjI7ICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDYuMjUlICAgeyBzdHJva2UtZGFzaGFycmF5OiAzMy4zIDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtMzMuMzg7ICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSk7IH0KICAgICAgICAgICAgMTIuNSUgICB7IHN0cm9rZS1kYXNoYXJyYXk6IDQuMTUgMTAwMDsgc3Ryb2tlLWRhc2hvZmZzZXQ6IC05MS43MjsgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKTsgfQogICAgICAgICAgICAxOC43NSUgIHsgc3Ryb2tlLWRhc2hhcnJheTogMzMuMyAxMDAwOyBzdHJva2UtZGFzaG9mZnNldDogLTEyMC44ODsgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDI1JSAgICAgeyBzdHJva2UtZGFzaGFycmF5OiA0LjE1IDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtMTc5LjIyOyBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSk7IH0KICAgICAgICAgICAgMzEuMjUlICB7IHN0cm9rZS1kYXNoYXJyYXk6IDMzLjMgMTAwMDsgc3Ryb2tlLWRhc2hvZmZzZXQ6IC0yMDguMzg7IGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKTsgfQogICAgICAgICAgICAzNy41JSAgIHsgc3Ryb2tlLWRhc2hhcnJheTogNC4xNSAxMDAwOyBzdHJva2UtZGFzaG9mZnNldDogLTI2Ni43MjsgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDQzLjc1JSAgeyBzdHJva2UtZGFzaGFycmF5OiAzMy4zIDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtMjk1Ljg4OyBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSk7IH0KICAgICAgICAgICAgNTAlICAgICB7IHN0cm9rZS1kYXNoYXJyYXk6IDQuMTUgMTAwMDsgc3Ryb2tlLWRhc2hvZmZzZXQ6IC0zNTQuMjI7IGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKTsgfQogICAgICAgICAgICA1Ni4yNSUgIHsgc3Ryb2tlLWRhc2hhcnJheTogMzMuMyAxMDAwOyBzdHJva2UtZGFzaG9mZnNldDogLTM4My4zODsgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDYyLjUlICAgeyBzdHJva2UtZGFzaGFycmF5OiA0LjE1IDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtNDQxLjcyOyBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSk7IH0KICAgICAgICAgICAgNjguNzUlICB7IHN0cm9rZS1kYXNoYXJyYXk6IDMzLjMgMTAwMDsgc3Ryb2tlLWRhc2hvZmZzZXQ6IC00NzAuODg7IGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKTsgfQogICAgICAgICAgICA3NSUgICAgIHsgc3Ryb2tlLWRhc2hhcnJheTogNC4xNSAxMDAwOyBzdHJva2UtZGFzaG9mZnNldDogLTUyOS4yMjsgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDgxLjI1JSAgeyBzdHJva2UtZGFzaGFycmF5OiAzMy4zIDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtNTU4LjM4OyBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSk7IH0KICAgICAgICAgICAgODcuNSUgICB7IHN0cm9rZS1kYXNoYXJyYXk6IDQuMTUgMTAwMDsgc3Ryb2tlLWRhc2hvZmZzZXQ6IC02MTYuNzI7IGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKTsgfQogICAgICAgICAgICA5My43NSUgIHsgc3Ryb2tlLWRhc2hhcnJheTogMzMuMyAxMDAwOyBzdHJva2UtZGFzaG9mZnNldDogLTY0NS44ODsgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDEwMCUgICAgeyBzdHJva2UtZGFzaGFycmF5OiA0LjE1IDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtNzA0LjIyOyB9CiAgICAgICAgfQoKICAgICAgICBAa2V5ZnJhbWVzIHN0cmV0Y2gtMyB7CiAgICAgICAgICAgIDAlICAgICAgeyBzdHJva2UtZGFzaGFycmF5OiA0LjE1IDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtMC4wNTsgICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDYuMjUlICAgeyBzdHJva2UtZGFzaGFycmF5OiAzMy4zIDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtMC4wNTsgICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDEyLjUlICAgeyBzdHJva2UtZGFzaGFycmF5OiA0LjE1IDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtODcuNTU7ICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDE4Ljc1JSAgeyBzdHJva2UtZGFzaGFycmF5OiAzMy4zIDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtODcuNTU7ICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDI1JSAgICAgeyBzdHJva2UtZGFzaGFycmF5OiA0LjE1IDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtMTc1LjA1OyAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDMxLjI1JSAgeyBzdHJva2UtZGFzaGFycmF5OiAzMy4zIDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtMTc1LjA1OyAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDM3LjUlICAgeyBzdHJva2UtZGFzaGFycmF5OiA0LjE1IDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtMjYyLjU1OyAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDQzLjc1JSAgeyBzdHJva2UtZGFzaGFycmF5OiAzMy4zIDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtMjYyLjU1OyAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDUwJSAgICAgeyBzdHJva2UtZGFzaGFycmF5OiA0LjE1IDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtMzUwLjA1OyAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDU2LjI1JSAgeyBzdHJva2UtZGFzaGFycmF5OiAzMy4zIDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtMzUwLjA1OyAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDYyLjUlICAgeyBzdHJva2UtZGFzaGFycmF5OiA0LjE1IDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtNDM3LjU1OyAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDY4Ljc1JSAgeyBzdHJva2UtZGFzaGFycmF5OiAzMy4zIDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtNDM3LjU1OyAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDc1JSAgICAgeyBzdHJva2UtZGFzaGFycmF5OiA0LjE1IDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtNTI1LjA1OyAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDgxLjI1JSAgeyBzdHJva2UtZGFzaGFycmF5OiAzMy4zIDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtNTI1LjA1OyAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDg3LjUlICAgeyBzdHJva2UtZGFzaGFycmF5OiA0LjE1IDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtNjEyLjU1OyAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDkzLjc1JSAgeyBzdHJva2UtZGFzaGFycmF5OiAzMy4zIDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtNjEyLjU1OyAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpOyB9CiAgICAgICAgICAgIDEwMCUgICAgeyBzdHJva2UtZGFzaGFycmF5OiA0LjE1IDEwMDA7IHN0cm9rZS1kYXNob2Zmc2V0OiAtNzAwLjA1OyB9CiAgICAgICAgfQogICAgPC9zdHlsZT4KICAgIDxkZWZzPgogICAgICAgIDxjbGlwUGF0aCBpZD0ib2N0YWdvbi1jbGlwIj4KICAgICAgICAgICAgPHBhdGggZD0iTTE1NSwwaC05MC43OTdsLTUuMTA5LDUuMTA5TDUuMTA5LDU5LjA5NGwtNS4xMDksNS4xMDl2OTAuNzk3bDUuMTA5LDUuMTA5LDUzLjk4NSw1My45ODUsNS4xMDksNS4xMDloOTAuNzk3bDUuMTA5LTUuMTA5LDUzLjk4NS01My45ODUsNS4xMDktNS4xMDl2LTkwLjc5N2wtNS4xMDktNS4xMDlMMTYwLjEwOSw1LjEwOWwtNS4xMDktNS4xMDloME0xNDcuNzc0LDE3LjQ0NGw1My45ODUsNTMuOTg1djc2LjM0NmwtNTMuOTg1LDUzLjk4NWgtNzYuMzQ2bC01My45ODUtNTMuOTg1di03Ni4zNDZsNTMuOTg1LTUzLjk4NWg3Ni4zNDZaIi8+CiAgICAgICAgPC9jbGlwUGF0aD4KICAgIDwvZGVmcz4KICAgIAogICAgPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTE1NSwwaC05MC43OTdsLTUuMTA5LDUuMTA5TDUuMTA5LDU5LjA5NGwtNS4xMDksNS4xMDl2OTAuNzk3bDUuMTA5LDUuMTA5LDUzLjk4NSw1My45ODUsNS4xMDksNS4xMDloOTAuNzk3bDUuMTA5LTUuMTA5LDUzLjk4NS01My45ODUsNS4xMDktNS4xMDl2LTkwLjc5N2wtNS4xMDktNS4xMDlMMTYwLjEwOSw1LjEwOWwtNS4xMDktNS4xMDloME0xNDcuNzc0LDE3LjQ0NGw1My45ODUsNTMuOTg1djc2LjM0NmwtNTMuOTg1LDUzLjk4NWgtNzYuMzQ2bC01My45ODUtNTMuOTg1di03Ni4zNDZsNTMuOTg1LTUzLjk4NWg3Ni4zNDZaIi8+CiAgICAKICAgIDxnIGNsaXAtcGF0aD0idXJsKCNvY3RhZ29uLWNsaXApIj4KICAgICAgICA8cGF0aCBjbGFzcz0iYW5pbWF0ZWQtcGF0aCBzZWdtZW50LTMiIHBhdGhMZW5ndGg9IjEwMDAiIGQ9Ik0gNjcuODE2IDguNzIyIEwgMTUxLjM4NyA4LjcyMiBMIDIxMC40ODEgNjcuODE2IEwgMjEwLjQ4MSAxNTEuMzg3IEwgMTUxLjM4NyAyMTAuNDgxIEwgNjcuODE2IDIxMC40ODEgTCA4LjcyMiAxNTEuMzg3IEwgOC43MjIgNjcuODE2IEwgNjcuODE2IDguNzIyIEwgMTUxLjM4NyA4LjcyMiBMIDIxMC40ODEgNjcuODE2IEwgMjEwLjQ4MSAxNTEuMzg3IEwgMTUxLjM4NyAyMTAuNDgxIEwgNjcuODE2IDIxMC40ODEgTCA4LjcyMiAxNTEuMzg3IEwgOC43MjIgNjcuODE2IEwgNjcuODE2IDguNzIyIEwgMTUxLjM4NyA4LjcyMiBMIDIxMC40ODEgNjcuODE2IEwgMjEwLjQ4MSAxNTEuMzg3IEwgMTUxLjM4NyAyMTAuNDgxIEwgNjcuODE2IDIxMC40ODEgTCA4LjcyMiAxNTEuMzg3IEwgOC43MjIgNjcuODE2IEwgNjcuODE2IDguNzIyIEwgMTUxLjM4NyA4LjcyMiBMIDIxMC40ODEgNjcuODE2IEwgMjEwLjQ4MSAxNTEuMzg3IEwgMTUxLjM4NyAyMTAuNDgxIEwgNjcuODE2IDIxMC40ODEgTCA4LjcyMiAxNTEuMzg3IEwgOC43MjIgNjcuODE2IEwgNjcuODE2IDguNzIyIEwgMTUxLjM4NyA4LjcyMiBMIDIxMC40ODEgNjcuODE2IEwgMjEwLjQ4MSAxNTEuMzg3IEwgMTUxLjM4NyAyMTAuNDgxIEwgNjcuODE2IDIxMC40ODEgTCA4LjcyMiAxNTEuMzg3IEwgOC43MjIgNjcuODE2IEwgNjcuODE2IDguNzIyIEwgMTUxLjM4NyA4LjcyMiBMIDIxMC40ODEgNjcuODE2IEwgMjEwLjQ4MSAxNTEuMzg3IEwgMTUxLjM4NyAyMTAuNDgxIEwgNjcuODE2IDIxMC40ODEgTCA4LjcyMiAxNTEuMzg3IEwgOC43MjIgNjcuODE2IEwgNjcuODE2IDguNzIyIEwgMTUxLjM4NyA4LjcyMiBMIDIxMC40ODEgNjcuODE2IEwgMjEwLjQ4MSAxNTEuMzg3IEwgMTUxLjM4NyAyMTAuNDgxIEwgNjcuODE2IDIxMC40ODEgTCA4LjcyMiAxNTEuMzg3IEwgOC43MjIgNjcuODE2IEwgNjcuODE2IDguNzIyIEwgMTUxLjM4NyA4LjcyMiBMIDIxMC40ODEgNjcuODE2IEwgMjEwLjQ4MSAxNTEuMzg3IEwgMTUxLjM4NyAyMTAuNDgxIEwgNjcuODE2IDIxMC40ODEgTCA4LjcyMiAxNTEuMzg3IEwgOC43MjIgNjcuODE2IEwgNjcuODE2IDguNzIyIEwgMTUxLjM4NyA4LjcyMiBMIDIxMC40ODEgNjcuODE2IEwgMjEwLjQ4MSAxNTEuMzg3IEwgMTUxLjM4NyAyMTAuNDgxIEwgNjcuODE2IDIxMC40ODEgTCA4LjcyMiAxNTEuMzg3IEwgOC43MjIgNjcuODE2IEwgNjcuODE2IDguNzIyIEwgMTUxLjM4NyA4LjcyMiBMIDIxMC40ODEgNjcuODE2IEwgMjEwLjQ4MSAxNTEuMzg3IEwgMTUxLjM4NyAyMTAuNDgxIEwgNjcuODE2IDIxMC40ODEgTCA4LjcyMiAxNTEuMzg3IEwgOC43MjIgNjcuODE2IEwgNjcuODE2IDguNzIyIiAvPgogICAgICAgIDxwYXRoIGNsYXNzPSJhbmltYXRlZC1wYXRoIHNlZ21lbnQtMiIgcGF0aExlbmd0aD0iMTAwMCIgZD0iTSA2Ny44MTYgOC43MjIgTCAxNTEuMzg3IDguNzIyIEwgMjEwLjQ4MSA2Ny44MTYgTCAyMTAuNDgxIDE1MS4zODcgTCAxNTEuMzg3IDIxMC40ODEgTCA2Ny44MTYgMjEwLjQ4MSBMIDguNzIyIDE1MS4zODcgTCA4LjcyMiA2Ny44MTYgTCA2Ny44MTYgOC43MjIgTCAxNTEuMzg3IDguNzIyIEwgMjEwLjQ4MSA2Ny44MTYgTCAyMTAuNDgxIDE1MS4zODcgTCAxNTEuMzg3IDIxMC40ODEgTCA2Ny44MTYgMjEwLjQ4MSBMIDguNzIyIDE1MS4zODcgTCA4LjcyMiA2Ny44MTYgTCA2Ny44MTYgOC43MjIgTCAxNTEuMzg3IDguNzIyIEwgMjEwLjQ4MSA2Ny44MTYgTCAyMTAuNDgxIDE1MS4zODcgTCAxNTEuMzg3IDIxMC40ODEgTCA2Ny44MTYgMjEwLjQ4MSBMIDguNzIyIDE1MS4zODcgTCA4LjcyMiA2Ny44MTYgTCA2Ny44MTYgOC43MjIgTCAxNTEuMzg3IDguNzIyIEwgMjEwLjQ4MSA2Ny44MTYgTCAyMTAuNDgxIDE1MS4zODcgTCAxNTEuMzg3IDIxMC40ODEgTCA2Ny44MTYgMjEwLjQ4MSBMIDguNzIyIDE1MS4zODcgTCA4LjcyMiA2Ny44MTYgTCA2Ny44MTYgOC43MjIgTCAxNTEuMzg3IDguNzIyIEwgMjEwLjQ4MSA2Ny44MTYgTCAyMTAuNDgxIDE1MS4zODcgTCAxNTEuMzg3IDIxMC40ODEgTCA2Ny44MTYgMjEwLjQ4MSBMIDguNzIyIDE1MS4zODcgTCA4LjcyMiA2Ny44MTYgTCA2Ny44MTYgOC43MjIgTCAxNTEuMzg3IDguNzIyIEwgMjEwLjQ4MSA2Ny44MTYgTCAyMTAuNDgxIDE1MS4zODcgTCAxNTEuMzg3IDIxMC40ODEgTCA2Ny44MTYgMjEwLjQ4MSBMIDguNzIyIDE1MS4zODcgTCA4LjcyMiA2Ny44MTYgTCA2Ny44MTYgOC43MjIgTCAxNTEuMzg3IDguNzIyIEwgMjEwLjQ4MSA2Ny44MTYgTCAyMTAuNDgxIDE1MS4zODcgTCAxNTEuMzg3IDIxMC40ODEgTCA2Ny44MTYgMjEwLjQ4MSBMIDguNzIyIDE1MS4zODcgTCA4LjcyMiA2Ny44MTYgTCA2Ny44MTYgOC43MjIgTCAxNTEuMzg3IDguNzIyIEwgMjEwLjQ4MSA2Ny44MTYgTCAyMTAuNDgxIDE1MS4zODcgTCAxNTEuMzg3IDIxMC40ODEgTCA2Ny44MTYgMjEwLjQ4MSBMIDguNzIyIDE1MS4zODcgTCA4LjcyMiA2Ny44MTYgTCA2Ny44MTYgOC43MjIgTCAxNTEuMzg3IDguNzIyIEwgMjEwLjQ4MSA2Ny44MTYgTCAyMTAuNDgxIDE1MS4zODcgTCAxNTEuMzg3IDIxMC40ODEgTCA2Ny44MTYgMjEwLjQ4MSBMIDguNzIyIDE1MS4zODcgTCA4LjcyMiA2Ny44MTYgTCA2Ny44MTYgOC43MjIgTCAxNTEuMzg3IDguNzIyIEwgMjEwLjQ4MSA2Ny44MTYgTCAyMTAuNDgxIDE1MS4zODcgTCAxNTEuMzg3IDIxMC40ODEgTCA2Ny44MTYgMjEwLjQ4MSBMIDguNzIyIDE1MS4zODcgTCA4LjcyMiA2Ny44MTYgTCA2Ny44MTYgOC43MjIiIC8+CiAgICAgICAgPHBhdGggY2xhc3M9ImFuaW1hdGVkLXBhdGggc2VnbWVudC0xIiBwYXRoTGVuZ3RoPSIxMDAwIiBkPSJNIDY3LjgxNiA4LjcyMiBMIDE1MS4zODcgOC43MjIgTCAyMTAuNDgxIDY3LjgxNiBMIDIxMC40ODEgMTUxLjM4NyBMIDE1MS4zODcgMjEwLjQ4MSBMIDY3LjgxNiAyMTAuNDgxIEwgOC43MjIgMTUxLjM4NyBMIDguNzIyIDY3LjgxNiBMIDY3LjgxNiA4LjcyMiBMIDE1MS4zODcgOC43MjIgTCAyMTAuNDgxIDY3LjgxNiBMIDIxMC40ODEgMTUxLjM4NyBMIDE1MS4zODcgMjEwLjQ4MSBMIDY3LjgxNiAyMTAuNDgxIEwgOC43MjIgMTUxLjM4NyBMIDguNzIyIDY3LjgxNiBMIDY3LjgxNiA4LjcyMiBMIDE1MS4zODcgOC43MjIgTCAyMTAuNDgxIDY3LjgxNiBMIDIxMC40ODEgMTUxLjM4NyBMIDE1MS4zODcgMjEwLjQ4MSBMIDY3LjgxNiAyMTAuNDgxIEwgOC43MjIgMTUxLjM4NyBMIDguNzIyIDY3LjgxNiBMIDY3LjgxNiA4LjcyMiBMIDE1MS4zODcgOC43MjIgTCAyMTAuNDgxIDY3LjgxNiBMIDIxMC40ODEgMTUxLjM4NyBMIDE1MS4zODcgMjEwLjQ4MSBMIDY3LjgxNiAyMTAuNDgxIEwgOC43MjIgMTUxLjM4NyBMIDguNzIyIDY3LjgxNiBMIDY3LjgxNiA4LjcyMiBMIDE1MS4zODcgOC43MjIgTCAyMTAuNDgxIDY3LjgxNiBMIDIxMC40ODEgMTUxLjM4NyBMIDE1MS4zODcgMjEwLjQ4MSBMIDY3LjgxNiAyMTAuNDgxIEwgOC43MjIgMTUxLjM4NyBMIDguNzIyIDY3LjgxNiBMIDY3LjgxNiA4LjcyMiBMIDE1MS4zODcgOC43MjIgTCAyMTAuNDgxIDY3LjgxNiBMIDIxMC40ODEgMTUxLjM4NyBMIDE1MS4zODcgMjEwLjQ4MSBMIDY3LjgxNiAyMTAuNDgxIEwgOC43MjIgMTUxLjM4NyBMIDguNzIyIDY3LjgxNiBMIDY3LjgxNiA4LjcyMiBMIDE1MS4zODcgOC43MjIgTCAyMTAuNDgxIDY3LjgxNiBMIDIxMC40ODEgMTUxLjM4NyBMIDE1MS4zODcgMjEwLjQ4MSBMIDY3LjgxNiAyMTAuNDgxIEwgOC43MjIgMTUxLjM4NyBMIDguNzIyIDY3LjgxNiBMIDY3LjgxNiA4LjcyMiBMIDE1MS4zODcgOC43MjIgTCAyMTAuNDgxIDY3LjgxNiBMIDIxMC40ODEgMTUxLjM4NyBMIDE1MS4zODcgMjEwLjQ4MSBMIDY3LjgxNiAyMTAuNDgxIEwgOC43MjIgMTUxLjM4NyBMIDguNzIyIDY3LjgxNiBMIDY3LjgxNiA4LjcyMiBMIDE1MS4zODcgOC43MjIgTCAyMTAuNDgxIDY3LjgxNiBMIDIxMC40ODEgMTUxLjM4NyBMIDE1MS4zODcgMjEwLjQ4MSBMIDY3LjgxNiAyMTAuNDgxIEwgOC43MjIgMTUxLjM4NyBMIDguNzIyIDY3LjgxNiBMIDY3LjgxNiA4LjcyMiBMIDE1MS4zODcgOC43MjIgTCAyMTAuNDgxIDY3LjgxNiBMIDIxMC40ODEgMTUxLjM4NyBMIDE1MS4zODcgMjEwLjQ4MSBMIDY3LjgxNiAyMTAuNDgxIEwgOC43MjIgMTUxLjM4NyBMIDguNzIyIDY3LjgxNiBMIDY3LjgxNiA4LjcyMiIgLz4KICAgIDwvZz4KICAgIAogICAgPHBhdGggZmlsbD0iI0E4MTMxMyIgZD0iTTk5LjA0OCwxNzkuNDQ4aC0zMy4yNjRjLTQuOTIyLTQuNzU3LTIwLjQwNy0xOS44NjctMjAuNDA3LTE5Ljg2N2wtLjM2OS0yNS4yNTFoMjAuMTM4djE3LjIwN2w3Ljc3NCw3LjI2NWg2LjVsLS4yNTUtOTcuODgxaC0yNy4yODJsLjA2MS03Ljc2NywxMy4zMjEtMTMuMTY2Yy4yMTktLjI3MiwzMy40LjAzMSwzMy40LjAzMS4wNzgsMCwuMzgyLDEzOS40MjkuMzgyLDEzOS40MjlaIi8+CiAgICA8cGF0aCBmaWxsPSIjQTgxMzEzIiBkPSJNMTI0LjI3OSwxNTguODAybDIxLjk5Ny0uMDUxLDcuMTg0LTcuMDkxLjEyNi0yOS4xNzYtNy4wMDQtNy4wMTVoLTIyLjMwNHY0My4zMzNNMTQ2LjU4Myw2MC45MjFoLTIyLjMwNHYzMy42NDdoMjIuMDQ5bDcuMjg1LTcuMDAxLS4wNjEtMTkuODQ5LTYuOTY4LTYuNzk2TTE1My45NzUsNDAuMDE5bDE5LjY1MSwxOS45OTcuMDMyLDM0LjEyMi0xMC4xMiwxMC40OTgsOS45MzEsMTAuNzExLjE0NSw0My44NDktMjAuMTQ5LDIwLjI1MmgtNDguODEzVjQwLjAxOWg0OS4zMjNaIi8+Cjwvc3ZnPg==";

// cart.js

// Using localStorage to persist the cart
let cart = JSON.parse(localStorage.getItem('boone_cart')) || [];

const publishableKey = "pk_test_51TDC2lBA6S4OMIQxQJjaqJrlyCZF7U5FZHC8F6FRwvJlSOSA0K4SrZuYEz546ouV6V5ehxDEklTRbvZzpgcDK3Er00nBtr4SRw";
const testPublishableKey = "mk_1TDC2nBA6S4OMIQxSJkruEsC";

// Initialize Stripe (requires Stripe.js to be loaded on the page)
// No longer using direct client-side Stripe initialization since we're using Supabase
// let stripe;
// if (typeof Stripe !== 'undefined') {
//   stripe = Stripe(publishableKey);
// }

// Supabase Edge Function URLs
const SUPABASE_CHECKOUT_URL = 'https://alfszmccbxndsrronyfe.supabase.co/functions/v1/create-checkout';
const SUPABASE_CHECKOUT_TEST_URL = 'https://alfszmccbxndsrronyfe.supabase.co/functions/v1/create-checkout-test';

// Function to add item to cart
function addToCart(priceId, name, size, variation, displayPrice, imageUrl, isTest = false, customText = null) {
  if (!priceId) {
    console.error("No valid price ID found");
    return;
  }

  // Convert string price to number if needed
  let numericPrice = 0;
  if(typeof displayPrice === 'string') {
      numericPrice = parseFloat(displayPrice.replace(/[^0-9.-]+/g,""));
  } else {
      numericPrice = displayPrice;
  }

  // Check if item with exact same id, size, variation, and custom text already exists in cart
  const existingItemIndex = cart.findIndex(item =>
    item.id === priceId &&
    item.size === size &&
    item.color === variation &&
    item.customText === customText
  );

  if (existingItemIndex > -1) {
    // Increment quantity
    cart[existingItemIndex].quantity += 1;
  } else {
    // Add new item
    cart.push({
      id: priceId,
      name: name,
      size: size,
      color: variation, // 'color' key kept for backwards compatibility with Edge function if needed
      customText: customText,
      price: numericPrice,
      displayPrice: displayPrice,
      imageUrl: imageUrl,
      quantity: 1,
      isTest: isTest
    });
  }

  saveCart();
  updateCartUI();


}

// Function to remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

// Save cart to local storage
function saveCart() {
  localStorage.setItem('boone_cart', JSON.stringify(cart));
}

// Format color to capitalize first letter
function formatColor(color) {
  return color.charAt(0).toUpperCase() + color.slice(1);
}

// Escape HTML to prevent XSS
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g,
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Update the Cart UI (Badge and Dropdown items)
function updateCartUI() {
  // Update Badge
  const badge = document.getElementById('cartBadge');
  const navBadge = document.getElementById('navCartBadge');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (badge) {
    if (totalItems > 0) {
      badge.textContent = totalItems;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }

  if (navBadge) {
    if (totalItems > 0) {
      navBadge.textContent = totalItems;
      navBadge.style.display = 'flex';
    } else {
      navBadge.style.display = 'none';
    }
  }

  // Update Cart Items List
  const cartItemsContainer = document.getElementById('cartItems');
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
    } else {
      cart.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';

        // Use stored imageUrl or fallback
        const thumbUrl = item.imageUrl ? item.imageUrl : JB_LOADER_URI;

        // Build metadata display logic
        const metaParts = [];
        if(item.size) metaParts.push(escapeHTML(item.size));
        if(item.color) metaParts.push(escapeHTML(formatColor(item.color)));
        if(item.customText) metaParts.push(`"${escapeHTML(item.customText)}"`);
        const metaDisplay = metaParts.length > 0 ? `<div class="cart-item-meta">${metaParts.join(' / ')}</div>` : '';

        itemEl.innerHTML = `
          <div class="cart-item-header">
            <div class="cart-item-title">${escapeHTML(item.name)}</div>
            <button class="remove-item-btn" onclick="removeFromCart(${index})" aria-label="Remove item">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
          <div class="cart-item-content">
            <img src="${thumbUrl}" alt="${item.name}" onerror="this.src=JB_LOADER_URI;" class="cart-item-img">
            <div class="cart-item-info">
              ${metaDisplay}
              <div class="cart-item-price">${item.displayPrice} x ${item.quantity}</div>
            </div>
          </div>
        `;
        cartItemsContainer.appendChild(itemEl);
      });
    }
  }

  // Update Total Price
  const totalPriceContainer = document.getElementById('cartTotal');
  if (totalPriceContainer) {
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceContainer.textContent = `$${totalPrice.toFixed(2)}`;
  }

  // Disable checkout button if cart is empty
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.disabled = cart.length === 0;
  }
}

// Make globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartUI = updateCartUI;
window.saveCart = saveCart;

// Handle Stripe Checkout
async function handleCheckout() {
  if (cart.length === 0) return;

  const checkoutBtn = document.getElementById('checkoutBtn');
  const originalText = checkoutBtn.innerHTML;
  checkoutBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
  checkoutBtn.disabled = true;

  try {
    // Check if there are any test items in the cart
    const hasTestItems = cart.some(item => item.isTest);
    const checkoutUrl = hasTestItems ? SUPABASE_CHECKOUT_TEST_URL : SUPABASE_CHECKOUT_URL;

    // Call Supabase Edge Function
    const response = await fetch(checkoutUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cart,
        successUrl: window.location.origin + '/store/success.html?session_id={CHECKOUT_SESSION_ID}',
        cancelUrl: window.location.href, // Go back to the page they were on
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create checkout session');
    }

    // Redirect to Stripe Checkout URL provided by Supabase
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error("Invalid response from checkout service.");
    }
  } catch (error) {
    console.error("Checkout error:", error);
    alert(error.message || "Something went wrong during checkout. Please try again.");
    checkoutBtn.innerHTML = originalText;
    checkoutBtn.disabled = false;
  }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  // Make sure cart script handles toggle
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const floatingCartMenu = document.getElementById('floatingCartMenu');

  if (cartToggleBtn && floatingCartMenu) {
    cartToggleBtn.addEventListener('click', function() {
      floatingCartMenu.classList.toggle('active');
    });
  }

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', handleCheckout);
  }

  // Initial UI update
  updateCartUI();
});
