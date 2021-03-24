from datetime import datetime
from datetime import timedelta
from random import randint
from random import sample

start = datetime.now()
end = start+timedelta(days=60)

# for _ in range(10):
#  if _ % 2 == 0:
#   value = randint(1, 12)
#  else:
#   value = randint(24, 48) 

# step = timedelta(hours=value)

result = []

while start < end:
    result.append(start.strftime('%Y-%m-%d %H:%M:%S'))
    high_rand = randint(24, 72)
    low_rand = randint(5,18)
    value = randint(low_rand, high_rand) 
    step = timedelta(hours=value)
    start += step

res = sample(result,len(result))

print(res)