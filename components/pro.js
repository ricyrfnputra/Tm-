function moveWithGravity(dt, o) {  // "o" refers to Array of objects we are moving
    for (let o1 of o) {  // Zero-out accumulator of forces for each object
        o1.fx = 0;
        o1.fy = 0;
    }
    for (let [i, o1] of o.entries()) {  // For each pair of objects...
        for (let [j, o2] of o.entries()) {
            if (i < j) {  // To not do same pair twice
                let dx = o2.x - o1.x;  // Compute distance between centers of objects
                let dy = o2.y - o1.y;
                let r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                if (r < 1) {  // To avoid division by 0
                    r = 1;
                }
                // Compute force for this pair; k = 1000
                let f = (1000 * o1.m * o2.m) / Math.pow(r, 2);
                let fx = f * dx / r;  // Break it down into components
                let fy = f * dy / r;
                o1.fx += fx;  // Accumulate for first object
                o1.fy += fy;
                o2.fx -= fx;  // And for second object in opposite direction
                o2.fy -= fy;
            }
        }
    }
    for (let o1 of o) {  // for each object update...
        let ax = o1.fx / o1.m;  // ...acceleration
        let ay = o1.fy / o1.m;

        o1.vx += ax * dt;  // ...speed
        o1.vy += ay * dt;

        o1.x += o1.vx * dt;  // ...position
        o1.y += o1.vy * dt;
    }
}