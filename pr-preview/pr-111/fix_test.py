import math

# Simulating the wave logic calculation to spot issues
waveRadius = 55
localMaxLift = 10.5 / 1000

# Suppose hover point is at x=0, z=0
hx, hz = 0, 0

# Suppose train 1 is at x=0, z=0 (but rotated around pivot to x=50, z=0)
trains = [{"wx": 50, "wz": 0}, {"wx": 0, "wz": 50}, {"wx": -50, "wz": 0}]

for t in trains:
    dx = t["wx"] - hx
    dz = t["wz"] - hz
    dist = math.sqrt(dx*dx + dz*dz)
    lift = 0
    if dist < waveRadius:
        lift = math.pow(math.cos((dist / waveRadius) * (math.pi / 2)), 2) * localMaxLift
    print(f"Dist: {dist}, Lift: {lift}")
