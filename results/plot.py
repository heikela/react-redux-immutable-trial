import matplotlib.pyplot as plt

with open('base.dat') as f:
    base = [float(l) for l in f]

with open('scroll.dat') as f:
    scroll = [float(l) for l in f]

with open('naive.dat') as f:
    naive = [float(l) for l in f]

with open('naive-scroll.dat') as f:
    naive_scroll = [float(l) for l in f]

items_per_point = 10*100//2

plt.plot(range(0, len(base) * items_per_point, items_per_point),
         base, label='use internal structure')
plt.plot(range(0, len(scroll) * items_per_point, items_per_point), scroll,
         label='use internal structure and scroll')
plt.plot(range(0, len(naive) * items_per_point, items_per_point),
         naive, label='use public interface')
plt.plot(range(0, len(naive_scroll) * items_per_point, items_per_point),
         naive_scroll, label='use public interface and scroll')
plt.legend()
plt.xlabel('items in series')
plt.ylabel('s / 100 updates')
plt.savefig('result.png', dpi=300)
