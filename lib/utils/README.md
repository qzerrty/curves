# directions

1. right
   - -> left
     - `dx > 0` => **type1**
     - `dy = 0 or abs(dx / dy) > 4` => **type2**  
        *start.y ~= end.y and dx < 0*
     - `dx < 0` => **type3**
   - -> right
   - -> top
   - -> bottom
2. left
   - -> right
     - `dx < 0` => **type1.reversed**
     - `dy = 0 or abs(dx / dy) > 4` => **type2.reversed**  
        *start.y ~= end.y and dx > 0*
     - `dx > 0` => **type3.reversed**
   - -> left
   - -> top
   - -> bottom
3. top
   - -> right
   - -> left
   - -> top
   - -> bottom
     - `dy < 0` => **type1.reversed.rotated90**
     - `dx = 0 or abs(dy / dx) > 4` => **type2.reversed.rotated90**  
        *start.x ~= end.x and dy < 0*
     - `dy > 0` => **type3.reversed.rotated90**
4. bottom
   - -> right
   - -> left
   - -> top
     - `dy > 0` => **type1.rotated90**
     - `dx = 0 or abs(dy / dx) > 4` => **type2.rotated90**  
        *start.x ~= end.x and dy < 0*
     - `dy < 0` => **type3.rotated90**
   - -> bottom