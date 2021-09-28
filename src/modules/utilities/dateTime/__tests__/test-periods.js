import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import createPeriods from '../periods';

const DateUTC = (...args) => new Date(Date.UTC(...args));

const eighties = {
  startDate: DateUTC(1980, 0, 1),
  endDate: DateUTC(1989, 11, 31),
};
const ninetieth = {
  startDate: DateUTC(1990, 0, 1),
  endDate: DateUTC(1999, 11, 31),
  stack: new Set(['ninetieth']),
};
const lateNinetiethEarlyNoughties = {
  startDate: DateUTC(1997, 5, 15),
  endDate: DateUTC(2002, 5, 15),
  stack: new Set(['lateNinetieth', 'earlyNoughties']),
};
const noughties = {
  startDate: DateUTC(2000, 0, 1),
  endDate: DateUTC(2009, 11, 31),
  stack: new Set(['noughties']),
};
const lateNoughtiesEarlyTens = {
  startDate: DateUTC(2007, 5, 15),
  endDate: DateUTC(2012, 5, 15),
  stack: new Set(['lateNoughties', 'earlyTens']),
};
const tens = {
  startDate: DateUTC(2010, 0, 1),
  endDate: DateUTC(2019, 11, 31),
  stack: new Set(['tens']),
};
const twenties = {
  startDate: DateUTC(2019, 0, 1),
  endDate: DateUTC(2029, 11, 31),
};

const subtractDay = date => subDays(date, 1);
const addDay = date => addDays(date, 1);

describe('creation', () => {
  it('should preserve initial periods', async () => {
    expect(createPeriods([noughties]).toArray()).toEqual([noughties]);
  });

  it('should filter out corrupted periods', async () => {
    expect(
      createPeriods([
        { wtf: true },
        { startDate: DateUTC(), endDate: 'hahaha' },
        { startDate: 'ololo', endDate: DateUTC() },
        { startDate: DateUTC(2021, 0, 1), endDate: DateUTC(2001, 0, 1) },
      ]).toArray(),
    ).toHaveLength(0);
  });

  it('should not combine distinct periods', async () => {
    expect(
      createPeriods([
        lateNinetiethEarlyNoughties,
        lateNoughtiesEarlyTens,
      ]).toArray(),
    ).toEqual([lateNinetiethEarlyNoughties, lateNoughtiesEarlyTens]);
  });

  it('should combine intersect periods', async () => {
    expect(
      createPeriods([
        lateNinetiethEarlyNoughties,
        noughties,
        lateNoughtiesEarlyTens,
      ]).toArray(),
    ).toEqual([
      {
        startDate: lateNinetiethEarlyNoughties.startDate,
        endDate: lateNoughtiesEarlyTens.endDate,
      },
    ]);
  });

  it('should combine contiguous periods', async () => {
    expect(createPeriods([ninetieth, noughties, tens]).toArray()).toEqual([
      {
        startDate: ninetieth.startDate,
        endDate: tens.endDate,
      },
    ]);
  });

  it('should play well with unordered initial periods', async () => {
    expect(createPeriods([tens, ninetieth]).toArray()).toEqual([
      ninetieth,
      tens,
    ]);
  });
});

describe('inclusion', () => {
  it('should add separate period if it not intersect with others', async () => {
    expect(
      createPeriods([eighties, twenties])
        .include(noughties)
        .toArray(),
    ).toEqual([eighties, noughties, twenties]);
  });

  it('should combine period if intersect with one of existent periods', async () => {
    expect(
      createPeriods([eighties, noughties])
        .include(lateNoughtiesEarlyTens)
        .toArray(),
    ).toEqual([
      eighties,
      {
        startDate: noughties.startDate,
        endDate: lateNoughtiesEarlyTens.endDate,
      },
    ]);
  });

  it('should combine and merge period if intersect with more that one of existent periods', async () => {
    expect(
      createPeriods([lateNinetiethEarlyNoughties, lateNoughtiesEarlyTens])
        .include(noughties)
        .toArray(),
    ).toEqual([
      {
        startDate: lateNinetiethEarlyNoughties.startDate,
        endDate: lateNoughtiesEarlyTens.endDate,
      },
    ]);
  });

  it('should absorb existend period if included whole of it', async () => {
    expect(
      createPeriods([noughties])
        .include({
          startDate: ninetieth.startDate,
          endDate: tens.endDate,
        })
        .toArray(),
    ).toEqual([
      {
        startDate: ninetieth.startDate,
        endDate: tens.endDate,
      },
    ]);
  });
});

describe('exclusion', () => {
  it('should ignore separate period if it not intersect with others', async () => {
    expect(
      createPeriods([eighties, twenties])
        .exclude(noughties)
        .toArray(),
    ).toEqual([eighties, twenties]);
  });

  it('should subtract period if intersect with one of existent periods', async () => {
    expect(
      createPeriods([eighties, noughties])
        .exclude(lateNoughtiesEarlyTens)
        .toArray(),
    ).toEqual([
      eighties,
      {
        startDate: noughties.startDate,
        endDate: subtractDay(lateNoughtiesEarlyTens.startDate),
      },
    ]);
  });

  it('should subtract of each period if intersect with more that one of existent periods', async () => {
    expect(
      createPeriods([lateNinetiethEarlyNoughties, lateNoughtiesEarlyTens])
        .exclude(noughties)
        .toArray(),
    ).toEqual([
      {
        startDate: lateNinetiethEarlyNoughties.startDate,
        endDate: subtractDay(noughties.startDate),
      },
      {
        startDate: addDay(noughties.endDate),
        endDate: lateNoughtiesEarlyTens.endDate,
      },
    ]);
  });

  it('should remove existend period if included whole of it', async () => {
    expect(
      createPeriods([noughties])
        .exclude({
          startDate: ninetieth.startDate,
          endDate: tens.endDate,
        })
        .toArray(),
    ).toHaveLength(0);
  });

  it('should split period if included only internal part of it', async () => {
    expect(
      createPeriods([
        {
          startDate: ninetieth.startDate,
          endDate: tens.endDate,
        },
      ])
        .exclude(noughties)
        .toArray(),
    ).toEqual([ninetieth, tens]);
  });

  it('should exclude one day from middle of sequence of three (edge case)', async () => {
    expect(
      createPeriods([
        {
          startDate: DateUTC(2018, 9, 31),
          endDate: DateUTC(2018, 10, 2),
        },
      ])
        .exclude({
          startDate: DateUTC(2018, 10, 1),
          endDate: DateUTC(2018, 10, 1),
        })
        .toArray(),
    ).toEqual([
      {
        startDate: DateUTC(2018, 9, 31),
        endDate: DateUTC(2018, 9, 31),
      },
      {
        startDate: DateUTC(2018, 10, 2),
        endDate: DateUTC(2018, 10, 2),
      },
    ]);
  });
});

describe('weekdaysMask', () => {
  it('should exclude each tuesday, not first, not last', async () => {
    expect(
      createPeriods([
        {
          startDate: DateUTC(2018, 0, 1), // monday
          endDate: DateUTC(2018, 0, 15),
        },
      ])
        .applyWeekdaysMask({
          monday: true,
          tuesday: false,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: true,
        })
        .toArray(),
    ).toEqual([
      {
        startDate: DateUTC(2018, 0, 1),
        endDate: DateUTC(2018, 0, 1),
      },
      {
        startDate: DateUTC(2018, 0, 3),
        endDate: DateUTC(2018, 0, 8),
      },
      {
        startDate: DateUTC(2018, 0, 10),
        endDate: DateUTC(2018, 0, 15),
      },
    ]);
  });

  it('should exclude few subsequent days, not first not last', async () => {
    expect(
      createPeriods([
        {
          startDate: DateUTC(2018, 0, 1), // monday
          endDate: DateUTC(2018, 0, 15),
        },
      ])
        .applyWeekdaysMask({
          monday: true,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: true,
          saturday: true,
          sunday: true,
        })
        .toArray(),
    ).toEqual([
      {
        startDate: DateUTC(2018, 0, 1),
        endDate: DateUTC(2018, 0, 1),
      },
      {
        startDate: DateUTC(2018, 0, 5),
        endDate: DateUTC(2018, 0, 8),
      },
      {
        startDate: DateUTC(2018, 0, 12),
        endDate: DateUTC(2018, 0, 15),
      },
    ]);
  });

  it('should exclude few non-subsequent days, not first not last', async () => {
    expect(
      createPeriods([
        {
          startDate: DateUTC(2018, 0, 1), // monday
          endDate: DateUTC(2018, 0, 15),
        },
      ])
        .applyWeekdaysMask({
          monday: true,
          tuesday: false,
          wednesday: true,
          thursday: false,
          friday: true,
          saturday: false,
          sunday: true,
        })
        .toArray(),
    ).toEqual([
      {
        startDate: DateUTC(2018, 0, 1),
        endDate: DateUTC(2018, 0, 1),
      },
      {
        startDate: DateUTC(2018, 0, 3),
        endDate: DateUTC(2018, 0, 3),
      },
      {
        startDate: DateUTC(2018, 0, 5),
        endDate: DateUTC(2018, 0, 5),
      },
      {
        startDate: DateUTC(2018, 0, 7),
        endDate: DateUTC(2018, 0, 8),
      },
      {
        startDate: DateUTC(2018, 0, 10),
        endDate: DateUTC(2018, 0, 10),
      },
      {
        startDate: DateUTC(2018, 0, 12),
        endDate: DateUTC(2018, 0, 12),
      },
      {
        startDate: DateUTC(2018, 0, 14),
        endDate: DateUTC(2018, 0, 15),
      },
    ]);
  });

  it('should exclude each monday, ever first or last', async () => {
    expect(
      createPeriods([
        {
          startDate: DateUTC(2018, 0, 1), // monday
          endDate: DateUTC(2018, 0, 15),
        },
      ])
        .applyWeekdaysMask({
          monday: false,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: true,
        })
        .toArray(),
    ).toEqual([
      {
        startDate: DateUTC(2018, 0, 2),
        endDate: DateUTC(2018, 0, 7),
      },
      {
        startDate: DateUTC(2018, 0, 9),
        endDate: DateUTC(2018, 0, 14),
      },
    ]);
  });

  it('should return empty array if all weekdays excluded', async () => {
    expect(
      createPeriods([
        {
          startDate: DateUTC(2018, 0, 1), // monday
          endDate: DateUTC(2018, 0, 15),
        },
      ])
        .applyWeekdaysMask({
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
        })
        .toArray(),
    ).toEqual([]);
  });

  it('should return empty array if all days excluded', async () => {
    expect(
      createPeriods([
        {
          startDate: DateUTC(2018, 0, 1), // monday
          endDate: DateUTC(2018, 0, 3),
        },
      ])
        .applyWeekdaysMask({
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: true,
        })
        .toArray(),
    ).toEqual([]);
  });

  it('should correcty exclude dates on week bounds', async () => {
    expect(
      createPeriods([
        {
          startDate: DateUTC(2018, 0, 1), // monday
          endDate: DateUTC(2018, 0, 15),
        },
      ])
        .applyWeekdaysMask({
          monday: false,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: false,
        })
        .toArray(),
    ).toEqual([
      {
        startDate: DateUTC(2018, 0, 2),
        endDate: DateUTC(2018, 0, 6),
      },
      {
        startDate: DateUTC(2018, 0, 9),
        endDate: DateUTC(2018, 0, 13),
      },
    ]);
  });
});

describe('stack', () => {
  it("should not add stack if it wasn't exist in original period", async () => {
    const periods = createPeriods([eighties, tens]).toArray();
    expect(periods[0]).not.toHaveProperty('stack');
  });

  it('should preserve stack', async () => {
    expect(createPeriods([ninetieth, tens]).toArray()).toEqual([
      expect.objectContaining({
        stack: ninetieth.stack,
      }),
      expect.objectContaining({
        stack: tens.stack,
      }),
    ]);
  });

  it('should union stack when periods merge', async () => {
    expect(
      createPeriods([
        lateNinetiethEarlyNoughties,
        noughties,
        lateNoughtiesEarlyTens,
      ]).toArray(),
    ).toEqual([
      expect.objectContaining({
        stack: new Set([
          ...Array.from(lateNinetiethEarlyNoughties.stack),
          ...Array.from(noughties.stack),
          ...Array.from(lateNoughtiesEarlyTens.stack),
        ]),
      }),
    ]);
  });

  it('should keep stack at both sides, when exclude period', async () => {
    expect(
      createPeriods([ninetieth, noughties])
        .exclude(lateNinetiethEarlyNoughties)
        .toArray(),
    ).toEqual([
      expect.objectContaining({
        stack: new Set([
          ...Array.from(ninetieth.stack),
          ...Array.from(noughties.stack),
        ]),
      }),
      expect.objectContaining({
        stack: new Set([
          ...Array.from(ninetieth.stack),
          ...Array.from(noughties.stack),
        ]),
      }),
    ]);
  });
});
