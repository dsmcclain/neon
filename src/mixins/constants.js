export default Object.freeze({
  ROTATIONS: { 1: 2, 2: 1, 3: 4, 4: 5, 5: 6, 6: 3 },

  DOORS: {
    1: ["north", "south"],
    2: ["east", "west"],
    3: ["north", "east"],
    4: ["east", "south"],
    5: ["south", "west"],
    6: ["west", "north"]
  },

  KEYS: {
    north: [1, 4, 5],
    east: [2, 5, 6],
    south: [1, 3, 6],
    west: [2, 3, 4]
  },

  NEIGHBORS: {
    1: { north: 8, east: 2, south: 4, west: 6 },
    2: { north: 9, east: 11, south: 3, west: 1 },
    3: { north: 2, east: 12, south: 14, west: 4 },
    4: { north: 1, east: 3, south: 15, west: 5 },
    5: { north: 6, east: 4, south: 16, west: 18 },
    6: { north: 7, east: 1, south: 5, west: 19 },
    7: { north: 22, east: 8, south: 6, west: 20 },
    8: { north: 23, east: 9, south: 1, west: 7 },
    9: { north: 24, east: 10, south: 2, west: 8 },
    10: { north: 25, east: 27, south: 11, west: 9 },
    11: { north: 10, east: 28, south: 12, west: 2 },
    12: { north: 11, east: 29, south: 13, west: 3 },
    13: { north: 12, east: 30, south: 32, west: 14 },
    14: { north: 3, east: 13, south: 33, west: 15 },
    15: { north: 4, east: 14, south: 34, west: 16 },
    16: { north: 5, east: 15, south: 35, west: 17 },
    17: { north: 18, east: 16, south: 36, west: 38 },
    18: { north: 19, east: 5, south: 17, west: 39 },
    19: { north: 20, east: 6, south: 18, west: 40 },
    20: { north: 21, east: 7, south: 19, west: 41 },
    21: { north: 44, east: 22, south: 20, west: 42 },
    22: { north: 45, east: 23, south: 7, west: 21 },
    23: { north: 46, east: 24, south: 8, west: 22 },
    24: { north: 47, east: 25, south: 9, west: 23 },
    25: { north: 48, east: 26, south: 10, west: 24 },
    26: { north: 49, east: 51, south: 27, west: 25 },
    27: { north: 26, east: 52, south: 28, west: 10 },
    28: { north: 27, east: 53, south: 29, west: 11 },
    29: { north: 28, east: 54, south: 30, west: 12 },
    30: { north: 29, east: 55, south: 31, west: 13 },
    31: { north: 30, east: 56, south: 58, west: 32 },
    32: { north: 13, east: 31, south: 59, west: 33 },
    33: { north: 14, east: 32, south: 60, west: 34 },
    34: { north: 15, east: 33, south: 61, west: 35 },
    35: { north: 16, east: 34, south: 62, west: 36 },
    36: { north: 17, east: 35, south: 63, west: 37 },
    37: { north: 38, east: 36, south: 64, west: 66 },
    38: { north: 39, east: 17, south: 37, west: 67 },
    39: { north: 40, east: 18, south: 38, west: 68 },
    40: { north: 41, east: 19, south: 39, west: 69 },
    41: { north: 42, east: 20, south: 40, west: 70 },
    42: { north: 43, east: 21, south: 41, west: 71 },
    43: { north: 74, east: 44, south: 42, west: 72 },
    44: { north: 75, east: 45, south: 21, west: 43 },
    45: { north: 76, east: 46, south: 22, west: 44 },
    46: { north: 77, east: 47, south: 23, west: 45 },
    47: { north: 78, east: 48, south: 24, west: 46 },
    48: { north: 79, east: 49, south: 25, west: 47 },
    49: { north: 80, east: 50, south: 26, west: 48 },
    50: { north: 81, east: null, south: 51, west: 49 },
    51: { north: 50, east: null, south: 52, west: 26 },
    52: { north: 51, east: null, south: 53, west: 27 },
    53: { north: 52, east: null, south: 54, west: 28 },
    54: { north: 53, east: null, south: 55, west: 29 },
    55: { north: 54, east: null, south: 56, west: 30 },
    56: { north: 55, east: null, south: 57, west: 31 },
    57: { north: 56, east: null, south: null, west: 58 },
    58: { north: 31, east: 57, south: null, west: 59 },
    59: { north: 32, east: 58, south: null, west: 60 },
    60: { north: 33, east: 59, south: null, west: 61 },
    61: { north: 34, east: 60, south: null, west: 62 },
    62: { north: 35, east: 61, south: null, west: 63 },
    63: { north: 36, east: 62, south: null, west: 64 },
    64: { north: 37, east: 63, south: null, west: 65 },
    65: { north: 66, east: 64, south: null, west: null },
    66: { north: 67, east: 37, south: 65, west: null },
    67: { north: 68, east: 38, south: 66, west: null },
    68: { north: 69, east: 39, south: 67, west: null },
    69: { north: 70, east: 40, south: 68, west: null },
    70: { north: 71, east: 41, south: 69, west: null },
    71: { north: 72, east: 42, south: 70, west: null },
    72: { north: 73, east: 43, south: 71, west: null },
    73: { north: null, east: 74, south: 72, west: null },
    74: { north: null, east: 75, south: 43, west: 73 },
    75: { north: null, east: 76, south: 44, west: 74 },
    76: { north: null, east: 77, south: 45, west: 75 },
    77: { north: null, east: 78, south: 46, west: 76 },
    78: { north: null, east: 79, south: 47, west: 77 },
    79: { north: null, east: 80, south: 48, west: 78 },
    80: { north: null, east: 81, south: 49, west: 79 },
    81: { north: null, east: null, south: 50, west: 80 }
  }
});
